function TestPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "297mm",
        width: "210mm",
        border: "1px solid black",
      }}
    >
      <div style={{ width: 640, height: 960 }}>
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              borderTop: "3px solid black",
            }}
          ></div>
          <div style={{ textAlign: "center", padding: "10px 0", fontSize: 20 }}>
            계약금 청구서
          </div>
          <div style={{ borderTop: "2px solid lightgrey" }}></div>
        </div>
        <div style={{ marginBottom: 40 }}>
          <div style={{ color: "rgb(30,145,251)", marginBottom: 5 }}>
            보내는이
          </div>
          <div
            style={{
              display: "flex",
              borderTop: "2px solid black",
              borderBottom: "2px solid gray",
            }}
          >
            <div
              style={{
                background: "lightgrey",
                width: 200,
                height: 40,
                display: "flex",
                paddingLeft: 10,
                alignItems: "center",
              }}
            >
              상호
            </div>
            <div></div>
          </div>
          <div
            style={{
              display: "flex",
              borderBottom: "2px solid gray",
            }}
          >
            <div
              style={{
                background: "lightgrey",
                width: 200,
                height: 40,
                display: "flex",
                paddingLeft: 10,
                alignItems: "center",
              }}
            >
              발행담당자
            </div>
            <div></div>
          </div>
          <div
            style={{
              display: "flex",
              borderBottom: "2px solid gray",
            }}
          >
            <div
              style={{
                background: "lightgrey",
                width: 200,
                height: 40,
                display: "flex",
                paddingLeft: 10,
                alignItems: "center",
              }}
            >
              전화번호
            </div>
            <div></div>
          </div>
        </div>
        <div style={{ marginBottom: 60 }}>
          <div style={{ color: "rgb(30,145,251)", marginBottom: 5 }}>
            받는이
          </div>
          <div
            style={{
              display: "flex",
              borderTop: "2px solid black",
              borderBottom: "2px solid gray",
            }}
          >
            <div
              style={{
                background: "lightgrey",
                width: 200,
                height: 40,
                display: "flex",
                paddingLeft: 10,
                alignItems: "center",
              }}
            >
              상호
            </div>
            <div></div>
          </div>
          <div
            style={{
              display: "flex",
              borderBottom: "2px solid gray",
            }}
          >
            <div
              style={{
                background: "lightgrey",
                width: 200,
                height: 40,
                display: "flex",
                paddingLeft: 10,
                alignItems: "center",
              }}
            >
              전화번호
            </div>
            <div></div>
          </div>
        </div>
        <div>
          <div
            style={{ color: "rgb(30,145,251)", fontSize: 20, marginBottom: 5 }}
          >
            <b>O</b> 안내문
          </div>
          <div style={{ marginBottom: 40 }}>
            <div style={{ paddingLeft: 5, marginBottom: 5 }}>
              안녕하세요, 법무법인 더존비즈온 입니다.
            </div>
            <div>
              고객님께서 의뢰하신 <b>ABCD사건</b>에 대한 계약금을 청구합니다.
            </div>
          </div>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 20, marginBottom: 5 }}>청구내용</div>
            <div>
              <div style={{ paddingLeft: 5, marginBottom: 5 }}>
                계약금: <b>100,000,000,000 원</b>
              </div>
              <div style={{ paddingLeft: 5, marginBottom: 5 }}>
                성공보수: <b>200,000,000,000 원</b>
              </div>
              <div style={{ paddingLeft: 5, marginBottom: 5 }}>
                총 합산: <b>300,000,000,000 원</b>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              borderBottom: "2px solid gray",
              marginBottom: 20,
            }}
          ></div>
        </div>
        <div style={{ marginBottom: 60 }}>
          <div style={{ color: "rgb(30,145,251)", marginBottom: 5 }}>
            O 결제안내
          </div>
          <div style={{ paddingLeft: 5, marginBottom: 5 }}>
            결제 정보는 아래를 참고부탁드립니다.
          </div>
          <div>
            계좌 입금 : 더존은행 <b>111-222-3333333 홍길동</b>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <b>2023</b>년 <b>08</b>월 <b>30</b>일
          </div>
          <div style={{ fontSize: 22 }}>법무법인 더존비즈온 김태훈</div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
