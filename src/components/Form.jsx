import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { MemoContext } from "../App";

// C : 입력 Form > 저장 addMemo  > 전송(POST) createMemo
export default function Form({}) {
  const navigate = useNavigate();
  const { state, handleUpdate, handleCreate } = useContext(MemoContext);
  const { id } = useParams();
  const { memos } = state;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const memo = id ? memos.find((m) => m.id === id) : null;
  // console.log(id);

  const handleFocus = (ref) => {
    ref.current?.focus();
  };

  const submit = (e) => {
    e.preventDefault();
    const isTitle = title.trim();
    const isContent = content.trim();

    if (!isTitle) {
      alert("제목을 입력해주세요.");
      handleFocus(titleRef);
      return false;
    }
    if (!isContent) {
      alert("내용을 입력해주세요.");
      handleFocus(contentRef);
      return false;
    }
    if (id) {
      handleUpdate(id, {
        title: title,
        content: content,
      });
      navigate("/memos/" + id, { replace: true });
    } else {
      handleCreate(title, content);
      navigate("/", { replace: true });
    }
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    if (memo) {
      setTitle(memo.title);
      setContent(memo.content);
    }
  }, [memo]);

  return (
    <section className="bg-appleCard border border-appleBorder shadow-apple rounded-apple p-6 mb-8 transition hover:shadow-appleHover">
      <form className="flex flex-col gap-3" onSubmit={submit}>
        <input
          placeholder="제목"
          className="w-full bg-transparent border border-appleBorder rounded-2xl px-5 py-3 focus:outline-none focus:border-appleBlue focus:scale-[1.01] transition"
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="내용을 입력하세요"
          className="w-full bg-transparent border border-appleBorder rounded-2xl px-5 py-4 h-32 resize-none focus:outline-none focus:border-appleBlue focus:scale-[1.01] transition"
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-4">
          <Link
            to={!id ? "/" : "/memos/" + id}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            취소
          </Link>
          <button
            className="px-4 py-2 rounded-xl bg-appleBlue text-white hover:brightness-110 transition"
            type="submit"
          >
            저장
          </button>
        </div>
      </form>
    </section>
  );
}
