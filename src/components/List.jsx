import { useState, useEffect } from "react";
import { getMemos, testGetMemos, deleteSelectedMemo } from "../api/memos.js";
import { formatDate } from "../utils/date.js";

// R : 요청(GET) getMemos > 응답 > 갱신 setState > 렌더링(로딩 > 에러 > 빈화면 > 성공) List
export default function List({
  memos,
  setMemos,
  onUpdate,
  onDelete,
  onToggle,
  isSearch,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkAll, setCheckAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);

  //전체선택 클릭시 setIsChecked에 ID 값 삽입
  const handleCheckAll = (checked) => {
    // console.log(checked);
    const memoItems = document.querySelectorAll(".memo-item");
    memoItems.forEach((memoItem) => {
      const memoItemId = memoItem.getAttribute("id");
      memoItem.querySelector(".memo-item__check").checked = checked;
      if (!checkAll) {
        // console.log(memoItemId);
        if (!isChecked.includes(memoItemId)) {
          setIsChecked((prev) => [...prev, memoItemId]);
        }
      } else {
        setIsChecked([]);
      }
    });
    setCheckAll(checked);
  };

  //선택 클릭시 setIsChecked에 ID 값 삽입
  const handleCheck = (id) => {
    if (!isChecked.includes(id)) {
      setIsChecked((prev) => [...prev, id]);
    } else {
      const newChecked = isChecked.filter((check) => check !== id);
      setIsChecked(newChecked);
    }
    // console.log(isChecked);
  };

  // 선택삭제 클릭시 setIsChecked에 있는 ID값 삭제 요청
  const handleCheckDelete = async () => {
    // console.log(isChecked.length);
    try {
      if (isChecked.length > 0) {
        // console.log("삭제");
        await deleteSelectedMemo({ data: { ids: isChecked } });
        const data = await getMemos();
        setMemos(data.items);
      }
    } catch (err) {
      setError("삭제에 실패했습니다.");
      console.error("메모 삭제 실패 : ", err);
    } finally {
      handleCheckAll(false);
    }
    // console.log(isChecked);
  };

  // 목록 불러오기
  const fetchMemos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMemos();
      setMemos(data.items);
      // console.log(data);
    } catch (err) {
      setError("데이터를 불러오지 못했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 오류 테스트용
  const testFetchMemos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await testGetMemos();
      setMemos(data.items);
      // console.log(data);
    } catch (err) {
      setError("데이터를 불러오지 못했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("초기 리스트 로드");
    // testFetchMemos(); // 오류 테스트
    fetchMemos(); // 배포
  }, []);

  return (
    <section className="bg-appleCard border border-appleBorder shadow-apple rounded-apple p-6">
      {/* 로딩 */}
      {isLoading && <p>로딩 중...</p>}

      {/* 에러 */}
      {error && (
        <div>
          <p>에러: {error}</p>
          <button onClick={fetchMemos}>다시 시도</button>
        </div>
      )}

      {/* info */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          메모 목록 ({memos.length})
        </h2>

        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkBoxAll accent-black scale-110"
              onChange={(e) => handleCheckAll(e.target.checked)}
              checked={checkAll ? true : false}
            />
            전체 선택
          </label>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:opacity-85 active:scale-95 transition font-medium"
            onClick={() => handleCheckDelete()}
          >
            선택 삭제
          </button>
        </div>
      </div>

      {/* items */}
      {/* 빈화면 */}
      {!isLoading && !error && memos.length === 0 && (
        <EmptyMemo isSearch={isSearch} />
      )}

      {/* 성공 */}
      {!isLoading && !error && memos.length > 0 && (
        <ul className="grid gap-4">
          {memos.map((item) => (
            <Memo
              key={item.id}
              memos={item}
              setMemos={setMemos}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onToggle={onToggle}
              onCheck={handleCheck}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function Memo({ memos, onUpdate, onDelete, onToggle, onCheck }) {
  const [isEdit, setIsEdit] = useState(false);
  const { id, title, content, isPinned, createdAt } = memos;
  const [pinned, setIsPinned] = useState(isPinned);
  const baseLi =
    "memo-item border border-appleBorder rounded-apple p-5 shadow-apple hover:shadow-appleHover hover:-translate-y-1 transition";

  const handleEdit = (id) => {
    setIsEdit(true);
  };

  return (
    <>
      <li
        id={id}
        className={`${baseLi} ${isPinned ? "bg-yellow-50 ring-2 ring-yellow-300" : "bg-white"}`}
        key={id}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="memo-item__check accent-black scale-110"
              onChange={() => onCheck(id)}
            />
            <button
              className={`text-xl ${!isPinned ? "opacity-40 hover:opacity-100 transition" : ""}`}
              // onClick={() => handlePinned(id, isPinned)}
              onClick={() => onToggle(id, isPinned)}
            >
              📌
            </button>
            {isPinned ? (
              <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                PINNED
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="flex gap-4 text-sm font-medium">
            <button
              className="text-appleBlue hover:underline"
              onClick={() => handleEdit(id)}
            >
              수정
            </button>
            <button
              className="text-red-500 hover:underline"
              onClick={() => onDelete(id)}
            >
              삭제
            </button>
          </div>
        </div>

        <h3 className="font-semibold mt-4 text-xl">{title}</h3>
        <p className="text-appleSub mt-2 leading-relaxed">{content}</p>

        <div className="text-xs text-appleSub mt-4">
          생성일: {formatDate(createdAt)} | 수정일: 2026-02-09
        </div>
      </li>
      {isEdit && (
        <EditMemo memos={memos} onUpdate={onUpdate} setIsEdit={setIsEdit} />
      )}
    </>
  );
}

function EmptyMemo({ isSearch }) {
  return (
    <div className="text-center py-16 text-appleSub">
      <div className="text-5xl mb-3">📝</div>
      {!isSearch ? (
        <>
          <p className="text-lg">검색된 메모가 없습니다</p>
        </>
      ) : (
        <>
          <p className="text-lg">아직 메모가 없습니다</p>
        </>
      )}
      <p className="text-sm">새 메모를 추가해보세요!</p>
    </div>
  );
}

function EditMemo({ memos, onUpdate, setIsEdit }) {
  const { id, title, content } = memos;
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditSave = () => {
    onUpdate(id, {
      title: editedTitle,
      content: editedContent,
    });
    setIsEdit(false);
  };

  return (
    <li className="border-2 border-appleBlue rounded-apple p-5 bg-white shadow-apple">
      <input
        className="w-full border border-appleBorder rounded-xl px-4 py-2 mb-2 focus:outline-none focus:border-appleBlue"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />

      <textarea
        className="w-full border border-appleBorder rounded-xl px-4 py-3 h-28 resize-none focus:outline-none focus:border-appleBlue"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      ></textarea>

      <div className="flex justify-end gap-2 mt-3">
        <button className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition">
          취소
        </button>
        <button
          className="px-4 py-2 rounded-xl bg-appleBlue text-white hover:brightness-110 transition"
          onClick={handleEditSave}
        >
          저장
        </button>
      </div>
    </li>
  );
}
