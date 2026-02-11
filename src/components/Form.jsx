import { useState, useRef } from "react";

export default function Form({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const handleFocus = (ref) => {
    ref.current?.focus();
  };

  const submit = (e) => {
    e.preventDefault();
    const isTitle = title.trim();
    const isContent = content.trim();

    if (!isTitle) {
      setError("제목을 입력해주세요.");
      handleFocus(titleRef);
      return false;
    }
    if (!isContent) {
      setError("내용을 입력해주세요.");
      handleFocus(contentRef);
      return false;
    }
    onAdd(title, content);
    setTitle("");
    setContent("");
    setError("");
  };

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

        <div className="flex justify-end">
          <button
            className="bg-black text-white px-6 py-3 rounded-2xl hover:opacity-80 active:scale-95 transition font-medium"
            type="submit"
          >
            추가
          </button>
        </div>
      </form>
    </section>
  );
}
