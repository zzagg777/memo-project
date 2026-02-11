import { useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Form from "./components/Form";
import List from "./components/List";
import { response } from "./api/memos";
import { getStorage, saveStorage, deleteAllStorage } from "./api/storage"; // for dev

function App() {
  const [memos, setMemos] = useState([]);

  const addMemo = (title, content) => {
    const newMemo = {
      title: title,
      content: content,
      tags: "",
    };
    setMemos((prev) => [...prev, newMemo]);
    saveStorage("memos", [...memos, newMemo]); // 개발용 > 로컬스토리지 저장
    console.log(getStorage("memos")); // 개발용 > 로컬스토리지 불러오기
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <Header></Header>
      <Search></Search>
      <Form onAdd={addMemo}></Form>
      <List></List>
    </main>
  );
}

export default App;
