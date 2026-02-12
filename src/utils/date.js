// 날짜 포맷팅
export function formatDate(dateString) {
  const date = new Date(dateString);
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 01~12 형식
  const day = date.getDate();
  const dayName = days[date.getDay()];

  // return `${year}년 ${month}월 ${day}일 (${dayName})`;
  return `${year}-${month}-${day}`;
}
