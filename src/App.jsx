import { useState, useReducer, createContext } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Form from "./components/Form";
import List from "./components/List";
import { createMemo, updateMemo, deleteMemo, pinnedMemo } from "./api/memos";
// import { getStorage, saveStorage, deleteAllStorage } from "./api/storage"; // 개발용

// C : 입력 Form > 저장 addMemo  > 전송(POST) createMemo >> 완료
// R : 요청(GET) getMemos > 응답 > 갱신 setState > 렌더링(로딩 > 에러 > 빈화면 > 성공) List >> 완료
// U : 요청(patch) updateMemo > 응단 > 갱신 setState > 렌더링(로딩 > 에러 > 빈화면 > 성공) List
// D 명령 > 전송(delete) List >> 완료

//1.만들기 createContext()
export const ThemeContext = createContext(null);

const ACTION_TYPE = {
  create: "create",
  delete: "delete",
  update: "update",
};
const initialState = {
  memos: [],
};
const memoReducer = (state, action) => {
  console.log("되나", state, action);
  switch (action.type) {
    case ACTION_TYPE.create:
      return { ...state, memos: [action.payload, ...state.memos] };
      break;
    case ACTION_TYPE.delete:
      return;
      break;
    case ACTION_TYPE.update:
      return;
      break;
    default:
      return state;
  }
};

function App() {
  const [theme, setTheme] = useState("light");
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState(""); // 입력 중인 값
  const [searchQuery, setSearchQuery] = useState(""); // 적용된 검색어
  const [state, dispatch] = useReducer(memoReducer, initialState);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const handleCreate = async (title, content) => {
    try {
      const newMemo = await createMemo({ title, content });
      // setMemos((prev) => [newMemo, ...prev]);
      dispatch({ type: ACTION_TYPE.create, payload: newMemo });
      handleSearchReset();
    } catch (err) {
      console.error("메모 저장 실패 : ", err);
    }
    // setMemos((prev) => [...prev, newMemo]); // 개발용
    // saveStorage("memos", [...memos, newMemo]); // 개발용
  };

  const handleDelete = async (id) => {
    try {
      await deleteMemo(id);
      setMemos((prev) => prev.filter((memo) => memo.id !== id));
    } catch (err) {
      setError("삭제에 실패했습니다.");
      console.error("메모 삭제 실패 : ", err);
    }
  };

  const handleUpdate = async (id, changes) => {
    // console.log(id, changes);
    try {
      const updated = await updateMemo(id, changes);
      // console.log(updated);
      setMemos((prev) => prev.map((memo) => (memo.id === id ? updated : memo)));
    } catch (err) {
      setError("수정에 실패했습니다");
    }
  };

  const handlePinned = async (id, changes) => {
    // console.log(id, changes);
    try {
      await pinnedMemo(id, !changes);
      const newMemo = memos.map((memo) => {
        if (memo.id === id) {
          return { ...memo, isPinned: !memo.isPinned };
        }
        return memo;
      });
      setMemos(newMemo);
    } catch (err) {
      setError("고정에 실패했습니다.");
      console.error("메모 고정 실패 : ", err);
    }
  };

  const handleSearchReset = () => {
    setSearchQuery("");
    setInputValue("");
  };

  return (
    //2.제공하기 <Provider value={}>
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main
        className={`max-w-4xl mx-auto p-8 ${theme === "dark" ? "bg-black" : "bg-white"}`}
      >
        <Header />
        <Search
          memos={memos}
          setMemos={setMemos} // 검색 후 새로운 메모목록 반환
          setIsLoading={setIsLoading} // 검색 시 로딩
          setError={setError} // 검색 시 오류
          searchQuery={searchQuery} // 검색 후 추가시 목록 초기화를 위하여 전역변수로 변경
          setSearchQuery={setSearchQuery} // 검색 후 추가시 목록 초기화를 위하여 전역변수로 변경
          inputValue={inputValue} // 검색 후 추가시 목록 초기화를 위하여 전역변수로 변경
          setInputValue={setInputValue} // 검색 후 추가시 목록 초기화를 위하여 전역변수로 변경
          handleSearchReset={handleSearchReset} // 검색 후 추가시 목록 초기화를 위하여 전역변수로 변경
          setIsSearch={setIsSearch}
        ></Search>
        <Form
          onAdd={handleCreate} // 입력 시 메모 생성
        ></Form>
        <List
          memos={memos}
          setMemos={setMemos}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isSearch={isSearch}
          onError={error}
          setError={setError}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onToggle={handlePinned}
        ></List>
      </main>
    </ThemeContext.Provider>
  );
}

export default App;
