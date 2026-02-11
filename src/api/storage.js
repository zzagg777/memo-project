// 저장
function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error("localStorage 저장 실패 :", e);
    return false;
  }
}

// 불러오기
function getStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("localStorage 불러오기 실패 :", e);
    return [];
  }
}

// 개별 삭제
function deleteStorage(key, id) {
  try {
    const todos = getStorage(key);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    saveStorage(key, updatedTodos);
  } catch (e) {
    console.error("localStorage 삭제 실패 :", e);
    return false;
  }
}

// 전체삭제
function deleteAllStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("localStorage 전체삭제 실패 :", e);
    return false;
  }
}

export { saveStorage, getStorage, deleteStorage, deleteAllStorage };
