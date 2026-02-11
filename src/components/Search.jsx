export default function Search() {
  return (
    <section className="bg-appleCard border border-appleBorder shadow-apple rounded-apple p-6 mb-8 transition hover:shadow-appleHover">
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="메모 검색"
          className="flex-1 bg-transparent border border-appleBorder rounded-2xl px-5 py-3 focus:outline-none focus:border-appleBlue focus:scale-[1.01] transition"
        />

        <button className="bg-appleBlue text-white px-5 rounded-2xl hover:brightness-110 active:scale-95 transition font-medium">
          검색
        </button>

        <button className="bg-gray-200 px-5 rounded-2xl hover:bg-gray-300 active:scale-95 transition font-medium">
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
