import client from "./client";

const response = await client.get("/memos");
console.log(response.data); // 응답 데이터 (자동 JSON 파싱)
console.log(response.status); // 200

export { response };
