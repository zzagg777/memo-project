import { useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MemoContext } from "../App";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, handleUpdate } = useContext(MemoContext);
  const { memos } = state;

  const memo = memos.find((m) => m.id === id);
  const [editedTitle, setEditedTitle] = useState(memo.title);
  const [editedContent, setEditedContent] = useState(memo.content);

  const handleEditCancel = () => {
    navigate("/memos/" + id, { replace: true });
  };

  const handleEditSave = () => {
    handleUpdate(id, {
      title: editedTitle,
      content: editedContent,
    });
    navigate("/memos/" + id, { replace: true });
  };

  return (
    <div className="border-2  rounded-apple p-5 bg-white shadow-apple">
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
        <button
          className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          onClick={handleEditCancel}
        >
          취소
        </button>
        <button
          className="px-4 py-2 rounded-xl bg-appleBlue text-white hover:brightness-110 transition"
          onClick={handleEditSave}
        >
          저장
        </button>
      </div>
    </div>
  );
}
