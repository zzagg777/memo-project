import { useState, useEffect } from "react";
import { getMemos } from "../api/memos.js";

export default function Search({
  setMemos,
  setIsLoading,
  setError,
  inputValue,
  setInputValue,
  searchQuery,
  setSearchQuery,
  handleSearchReset,
  setIsSearch,
}) {
  const handleSearch = () => {
    setSearchQuery(inputValue); // 버튼 클릭 시에 검색어를 입력한 값으로 변경 처리
  };

  // useEffect를 사용하여 의존성배열(검색어)가 바뀔때마다, 실행되도록 처리
  useEffect(() => {
    const fetchMemos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMemos({ q: searchQuery });
        setMemos(data.items);
        // console.log(data);
        if (data.items.length === 0) {
          setIsSearch(false);
        }
      } catch (err) {
        setError("검색 데이터를 불러오지 못했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
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
        <select className="border border-appleBorder rounded-2xl px-4 py-2 bg-white hover:border-gray-300 transition">
          <option>생성일</option>
          <option>수정일</option>
          <option>제목</option>
        </select>

        <select className="border border-appleBorder rounded-2xl px-4 py-2 bg-white hover:border-gray-300 transition">
          <option>오름차순</option>
          <option>내림차순</option>
        </select>

        <select className="border border-appleBorder rounded-2xl px-4 py-2 bg-white hover:border-gray-300 transition">
          <option>전체</option>
          <option>고정만</option>
          <option>고정 안된 것만</option>
        </select>
      </div>
    </section>
  );
}
