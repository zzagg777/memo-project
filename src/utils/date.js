// 날짜 포맷팅
export function formatDate(dateString) {
  const date = new Date(dateString);
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 01~12 형식
  const day = date.getDate();
  const dayName = days[date.getDay()];
  const hour = date.getHours();
  const minutes = date.getMinutes();

  // return `${year}년 ${month}월 ${day}일 (${dayName})`;
  return `${year}-${month}-${day} ${hour}:${minutes}`;
}

// 날짜순 정렬
export function sortDate(events, sort) {
  return events.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    // console.log(dateA);
    // console.log(dateB);
    if (sort === "desc") {
      return dateA - dateB; // 내림차순 (오래된 날짜가 위로)
    }
    if (sort === "asc") {
      return dateB - dateA; // 오름차순 (최신 날짜가 위로)
    }
  });
}
