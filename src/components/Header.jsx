import { useContext } from "react";
import { ThemeContext } from "../App";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header
      className={`mb-12 flex justify-between ${theme === "dark" ? "text-white" : "text-black"}`}
    >
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">메모 관리</h1>
        <p className="text-appleSub mt-2 text-lg">
          React + Axios + CRUD 프로젝트
        </p>
      </div>
      <div>
        <button onClick={toggleTheme}>
          {theme === "light" ? <span>🌚</span> : <span>🌝</span>}
        </button>
      </div>
    </header>
  );
}
