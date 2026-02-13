import client from "./client";

const PATH = "/memos";
// 목록 조회
// 백엔드에서 에러 등 테스트를 params 객체의 요소로 넣어 둘 경우 함수 호출 단계에서 매개변수를 사용해서 접근가능
export const getMemos = async (params = {}) => {
  const response = await client.get("/memos", { params });
  return response.data;
};

// 생성
export const createMemo = async (payload) => {
  const response = await client.post("/memos", payload);
  return response.data;
};

// 수정
export const updateMemo = async (id, payload) => {
  const response = await client.patch(`/memos/${id}`, payload);
  return response.data;
};

// 삭제
export const deleteMemo = async (id) => {
  await client.delete(`/memos/${id}`);
};

// 삭제
export const deleteSelectedMemo = async (ids) => {
  await client.delete(`/memos/`, ids);
};

// 고정
export const pinnedMemo = async (id, payload) => {
  const response = await client.patch(`/memos/${id}/pin`, {
    isPinned: payload,
  });
};
