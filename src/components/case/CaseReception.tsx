import Card from "@mui/material/Card";

function CaseReception() {
  return (
    <Card>
      <div>
        <div>
          접수1 <button>수정</button>
          <button>삭제</button>
        </div>
        <div>
          접수2 <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <button>등록</button>
    </Card>
  );
}

export default CaseReception;
