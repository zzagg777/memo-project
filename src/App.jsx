import { useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Form from "./components/Form";
import List from "./components/List";
import { getMemos, createMemo, updateMemo, deleteMemo } from "./api/memos";
import { getStorage, saveStorage, deleteAllStorage } from "./api/storage"; // for dev

// C : 입력 Form > 저장 addMemo  > 전송(POST) createMemo >> 완료
// R : 요청(GET) getMemos > 응답 > 갱신 setState > 렌더링(로딩 > 에러 > 빈화면 > 성공) List
// U
// D 명령 > 전송(delete)

function App() {
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMemo = async (title, content) => {
    const newMemo = {
      // id: Date.now(), // 개발용
      title: title,
      content: content,
      tags: [],
    };
    try {
      const savedMemo = await createMemo(newMemo);
      setMemos((prev) => [savedMemo, ...prev]);
    } catch (err) {
      console.error("메모 저장 실패 : ", err);
    }
    // setMemos((prev) => [...prev, newMemo]); // 개발용
    // saveStorage("memos", [...memos, newMemo]); // 개발용
  };

  const deleteMemo = (id) => {
    const newMemo = memos.filter((memo) => memo.id !== id);
    setMemos(newMemo);
    saveStorage("memos", newMemo);
  };

  const pinnedMemo = (id) => {
    const newMemo = memos.map((memo) => {
      if (memo.id === id) {
        return { ...memo, isPinned: !memo.isPinned };
      }
      return memo;
    });
    setMemos(newMemo);
    saveStorage("memos", newMemo);
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <Header></Header>
      <Search
        setMemos={setMemos} // 검색 후 새로운 메모목록 반환
        setIsLoading={setIsLoading} // 검색 시 로딩
        setError={setError} // 검색 시 오류
      ></Search>
      <Form
        onAdd={addMemo} // 입력 시 메모 생성
      ></Form>
      <List
        memos={memos}
        setMemos={setMemos}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onError={error}
        setError={setError}
        onDelete={deleteMemo}
        onToggle={pinnedMemo}
      ></List>
    </main>
  );
}

export default App;
