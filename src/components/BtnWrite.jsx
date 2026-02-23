import { Link } from "react-router-dom";

export default function BtnWrite() {
  return (
    <Link
      to="/memos/new"
      className="fixed bottom-10 right-10 w-16 h-16 bg-appleBlue text-white text-3xl rounded-full shadow-fab hover:scale-110 active:scale-95 transition flex items-center justify-center"
    >
      +
    </Link>
  );
}
