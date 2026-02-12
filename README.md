1. **API 파일 구조**
<!-- client.js와 memos.js의 역할 설명 -->

- client : Axios 인스턴스 생성 후 공통적으로 사용될 값 설정
- memos : Axios를 활용하여 서버와 통신할 공통 함수 (CRUD)
- storage : 기능 개발시 사용되는 로컬스토리지 공통 함수

2. **상태 UI 설명**
<!-- loading/error/empty를 각각 **어떤 조건에서** 보여주는지 -->

- loading : 서버와 통신시 데이터를 불러오는 과정에서 최초에 사용
- error : 서버와 통신 오류로 인하여 데이터 로드 실패시 사용
- empty : 서버 내 데이터 부재시 사용

3. **CRUD 구현 설명** (구현한 것만)
<!-- Create/Update/Delete에서 **상태가 어떻게 바뀌는지** -->

- C : App > handleCreate, setMemos를 통한 상태 변경 및 createMemo(POST)를 통한 서버 업데이트
- U : List > EditMemo, setIsEdit를 통한 상태 변경 및 updateMemo(PATCH)를 통한 서버 업데이트
- D : 개별삭제 App > handleDelete, setMemos, filter를 활용한 상태 변경 및 deleteMemo(delete)를 통한 서버 업데이트
- D : 전체 및 선택삭제 List > handleCheckDelete, deleteSelectedMemo로 id값 전송 및 삭제 후 getMemos, setMemos를 통한 서버 업데이트

4. (선택 확장을 했다면) 무엇을 구현했는지

- 재시도 버튼 : List > testFetchMemos, axios함수에 ?fail=1 값을 부여하여 오류발생 후 정상 함수로 불러오기 테스트 적용
- 빈 상태 유도 : List > EmptyMemo, 데이터 부재시 사용될 컴포넌트 적용
- 핀 고정 : : App > handlePinned, patch를 사용하여 적용
- 선택 삭제 : List > handleCheck... , 전체선택, 개별선택로 일괄 삭제 적용
- 고정 필터 : Search > handleSort, 고정된것만 보기 적용
