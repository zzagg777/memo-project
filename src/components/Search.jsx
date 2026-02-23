import { useState, useEffect, useContext } from "react";
import { MemoContext, ACTION_TYPE } from "../App";
import { getMemos } from "../api/memos.js";
import { sortDate } from "../utils/date.js";
import { useSearchParams } from "react-router-dom";

export default function Search({}) {
  const { state, dispatch } = useContext(MemoContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(""); // 입력 중인 값
  const [searchQuery, setSearchQuery] = useState(""); // 적용된 검색어
  const [sortPinned, setSortPinned] = useState("all");
  const [sortDated, setSortDated] = useState("asc");

  const query = searchParams.get("q") || "";
  // console.log(query);
  const handleSearch = () => {
    setSearchQuery(inputValue); // 버튼 클릭 시에 검색어를 입력한 값으로 변경 처리
    setSearchParams({ q: inputValue });
  };

  const handleSearchReset = () => {
    setSearchQuery("");
    setInputValue("");
  };

  const handleSort = async (sort, type) => {
    const data = await getMemos();
    // const all = data.items;
    // const pinned = data.items.filter((item) => item.isPinned);
    // const unPinned = data.items.filter((item) => !item.isPinned);
    let newMemos = data.items;
    if (type === "pin") {
      setSortPinned(sort);
    }
    if (type === "date") {
      setSortDated(sort);
    }

    if (sort === "pinned") {
      newMemos = data.items.filter((item) => item.isPinned);
    }
    if (sort === "unPinned") {
      newMemos = data.items.filter((item) => !item.isPinned);
    }

    // setMemos(sortDate(newMemos, sortDated));
    // setMemos(newMemos);
    dispatch({ type: ACTION_TYPE.set, payload: newMemos });
    // console.log(sort, type);
    // console.log(sortPinned);
    // console.log(sortDated);
    // console.log(newMemos);
  };
  const handleSortPinned = async (sort) => {
    // console.log(sort);
    const data = await getMemos();
    const pinned = data.items.filter((item) => item.isPinned);
    const unPinned = data.items.filter((item) => !item.isPinned);
    if (sort === "pinned") {
      // console.log(pinned);
      // setMemos(pinned);
      dispatch({ type: ACTION_TYPE.set, payload: pinned });
    } else if (sort === "unPinned") {
      // console.log(unPinned);
      // setMemos(unPinned);
      dispatch({ type: ACTION_TYPE.set, payload: unPinned });
    } else {
      // setMemos(data.items);
      dispatch({ type: ACTION_TYPE.set, payload: data.items });
    }
    setSortPinned(sort);
    console.log(sortPinned);
    // console.log(memos);
  };

  const handleSortDate = async (sort) => {
    console.log(sort);
    console.log(sortPinned);
    const data = await getMemos();
    if (sortPinned === "pinned") {
    }
    // setMemos(sortDate(data.items, sort));
    dispatch({ type: ACTION_TYPE.set, payload: sortDate(data.items, sort) });
  };

  // useEffect를 사용하여 의존성배열(검색어)가 바뀔때마다, 실행되도록 처리
  useEffect(() => {
    const fetchMemos = async () => {
      dispatch({ type: ACTION_TYPE.loading, payload: true });
      dispatch({ type: ACTION_TYPE.error, payload: null });
      try {
        const data = await getMemos({ q: searchQuery });
        // setMemos(data.items);
        dispatch({ type: ACTION_TYPE.set, payload: data.items });
        // console.log(data);
        if (data.items.length === 0) {
          // setIsSearch(false);
          dispatch({ type: ACTION_TYPE.search, payload: false });
        }
      } catch (err) {
        // setError("검색 데이터를 불러오지 못했습니다.");
        // console.error(err);
        dispatch({
          type: ACTION_TYPE.error,
          payload: "메모 검색 실패",
        });
      } finally {
        dispatch({ type: ACTION_TYPE.loading, payload: false });
      }
    };
    fetchMemos();
    // console.log(searchQuery);
  }, [searchQuery]);

  return (
    <section className="bg-appleCard border border-appleBorder shadow-apple rounded-apple p-6 mb-8 transition hover:shadow-appleHover">
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="메모 검색"
          className="flex-1 bg-transparent border border-appleBorder rounded-2xl px-5 py-3 focus:outline-none focus:border-appleBlue focus:scale-[1.01] transition"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button
          className="bg-appleBlue text-white px-5 rounded-2xl hover:brightness-110 active:scale-95 transition font-medium"
          onClick={() => handleSearch()}
        >
          검색
        </button>

        <button
          className="bg-gray-200 px-5 rounded-2xl hover:bg-gray-300 active:scale-95 transition font-medium"
          onClick={handleSearchReset}
        >
          초기화
        </button>
      </div>

      <div className="flex gap-3 flex-wrap">
        {/* <select className="border border-appleBorder rounded-2xl px-4 py-2 bg-white hover:border-gray-300 transition">
          <option>생성일</option>
          <option>수정일</option>
          <option>제목</option>
        </select> */}

        {/* <select
          className="border border-appleBorder rounded-2xl px-4 py-2 bg-white hover:border-gray-300 transition"
          // onChange={(e) => handleSort(e.target.value, "date")}
          onChange={(e) => handleSort(e.target.value, "date")}
        >
          <option value={"asc"}>오름차순</option>
          <option value={"desc"}>내림차순</option>
        </select> */}

        <select
          className="border border-appleBorder rounded-2xl px-4 py-2 bg-white hover:border-gray-300 transition"
          // onChange={(e) => handleSort(e.target.value, "pin")}
          onChange={(e) => handleSort(e.target.value, "pin")}
        >
          <option value={"all"}>전체</option>
          <option value={"pinned"}>고정만</option>
          <option value={"unPinned"}>고정 안된 것만</option>
        </select>
      </div>
    </section>
  );
}
