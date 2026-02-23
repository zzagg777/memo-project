import { useContext } from "react";
import { MemoContext, ACTION_TYPE } from "../App";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/date.js";

export default function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, handleDelete } = useContext(MemoContext);
  const { memos, isLoading, error, isSearch } = state;

  const memo = memos.find((m) => m.id === id);
  // console.log(id);
  // console.log(memo);
  const handleDeleteView = (id) => {
    handleDelete(id);
    navigate("/", { replace: true });
  };

  return (
    <section className="bg-appleCard border border-appleBorder shadow-apple rounded-apple p-8 transition hover:shadow-appleHover">
      {/* <!-- 상단 액션 영역 --> */}
      <div className="flex justify-between items-start mb-6">
        <div></div>
        <div className="flex gap-4 text-sm font-medium">
          <Link to="/" className="text-black hover:underline">
            목록
          </Link>
          <Link
            to={"/memos/" + id + "/edit"}
            className="text-appleBlue hover:underline"
          >
            수정
          </Link>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDeleteView(id)}
          >
            삭제
          </button>
        </div>
      </div>

      {/* <!-- 제목 --> */}
      <h2 className="text-3xl font-semibold mb-6 tracking-tight">
        {memo.title}
      </h2>

      {/* <!-- 내용 --> */}
      <div className="text-lg leading-relaxed text-appleText whitespace-pre-line">
        {memo.content}
      </div>

      {/* <!-- 날짜 영역 --> */}
      <div className="border-t border-appleBorder mt-8 pt-6 text-sm text-appleSub space-y-2">
        생성일: {formatDate(memo.createdAt)} | 수정일:{" "}
        {formatDate(memo.updatedAt)}
      </div>
    </section>
  );
}
