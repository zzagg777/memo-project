export default function List() {
  return (
    <section className="bg-appleCard border border-appleBorder shadow-apple rounded-apple p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">메모 목록 (3)</h2>

        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-black scale-110" />
            전체 선택
          </label>

          <button className="bg-red-500 text-white px-4 py-2 rounded-xl hover:opacity-85 active:scale-95 transition font-medium">
            선택 삭제
          </button>
        </div>
      </div>

      {/* <div className="text-center py-16 text-appleSub">
      <div className="text-5xl mb-3">📝</div>
      <p className="text-lg">아직 메모가 없습니다</p>
      <p className="text-sm">첫 메모를 추가해보세요!</p>
    </div> */}

      <div className="grid gap-4">
        {/* <!-- PINNED CARD --> */}
        <div className="border border-appleBorder rounded-apple p-5 bg-yellow-50 shadow-apple hover:shadow-appleHover hover:-translate-y-1 transition">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="accent-black scale-110" />
              <button className="text-xl">📌</button>
              <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                PINNED
              </span>
            </div>

            <div className="flex gap-4 text-sm font-medium">
              <button className="text-appleBlue hover:underline">수정</button>
              <button className="text-red-500 hover:underline">삭제</button>
            </div>
          </div>

          <h3 className="font-semibold mt-4 text-xl">회의 준비</h3>
          <p className="text-appleSub mt-2 leading-relaxed">
            내일 오전 회의 자료 정리하고 발표 순서 체크하기.
          </p>

          <div className="text-xs text-appleSub mt-4">
            생성일: 2026-02-10 | 수정일: 2026-02-10
          </div>
        </div>

        {/* <!-- NORMAL CARD --> */}
        <div className="border border-appleBorder rounded-apple p-5 bg-white shadow-apple hover:shadow-appleHover hover:-translate-y-1 transition">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="accent-black scale-110" />
              <button className="text-xl opacity-40 hover:opacity-100 transition">
                📌
              </button>
            </div>

            <div className="flex gap-4 text-sm font-medium">
              <button className="text-appleBlue hover:underline">수정</button>
              <button className="text-red-500 hover:underline">삭제</button>
            </div>
          </div>

          <h3 className="font-semibold mt-4 text-xl">운동 가기</h3>
          <p className="text-appleSub mt-2 leading-relaxed">
            하체 운동 + 30분 러닝.
          </p>

          <div className="text-xs text-appleSub mt-4">
            생성일: 2026-02-09 | 수정일: 2026-02-09
          </div>
        </div>

        {/* <!-- INLINE EDIT CARD 예시 --> */}
        <div className="border-2 border-appleBlue rounded-apple p-5 bg-white shadow-apple">
          <input
            className="w-full border border-appleBorder rounded-xl px-4 py-2 mb-2 focus:outline-none focus:border-appleBlue"
            value="수정중인 메모 제목"
          />

          <textarea className="w-full border border-appleBorder rounded-xl px-4 py-3 h-28 resize-none focus:outline-none focus:border-appleBlue">
            수정중인 내용...
          </textarea>

          <div className="flex justify-end gap-2 mt-3">
            <button className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition">
              취소
            </button>
            <button className="px-4 py-2 rounded-xl bg-appleBlue text-white hover:brightness-110 transition">
              저장
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
