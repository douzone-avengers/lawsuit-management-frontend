import Card from "@mui/material/Card";

function CaseReception() {
  return (
    <>
      <Card>
        <div style={{ display: "flex" }}>
          <div>기일 정보</div>
          <button>등록</button>
        </div>
        <div>
          <div>
            <span>접수1</span>
            <button>수정</button>
            <button>삭제</button>
          </div>
          <div>
            <span>접수2</span>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>
      </Card>
      <Card>
        <div style={{ display: "flex" }}>
          <div>불변 기간</div>
          <button>등록</button>
        </div>
        <div>
          접수1 <button>수정</button>
          <button>삭제</button>
        </div>
        <div>
          접수2 <button>수정</button>
          <button>삭제</button>
        </div>
      </Card>
    </>
  );
}

export default CaseReception;
