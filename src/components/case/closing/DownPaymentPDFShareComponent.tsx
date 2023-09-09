import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PageLoadingSpinner from "../../layout/PageLoadingSpinner.tsx";
import downPaymentPDFUploadLoadingState from "../../../states/case/info/closing/DownPaymentPDFUploadLoadingState.tsx";
import userState from "../../../states/user/UserState.ts";
import { delimiter } from "../../../lib/convert.ts";
import downPaymentShareEmailsState from "../../../states/case/info/closing/DownPaymentShareEmailsState.ts";
import downPaymentSharePopUpOpenState from "../../../states/case/info/closing/DownPaymentSharePopUpOpenState.ts";

type AllLawsuitType = {
  lawsuit: {
    id: number;
    name: string;
    num: string;
    court: string;
    commissionFee: number;
    contingentFee: number;
    judgementResult: string;
    judgementDate: string;
    clients: {
      id: number;
      email: string;
      name: string;
      phone: string;
      address: string;
    }[];
    members: {
      id: number;
      email: string;
      name: string;
      phone: string;
      address: string;
    }[];
  };
  advices: {
    id: number;
    title: string;
    contents: string;
    date: string;
    memberNames: string[];
    clientNames: string[];
  }[];
  expenses: {
    id: number;
    contents: string;
    amount: number;
    date: string;
  }[];
};
function DownPaymentPDFShareComponent() {
  const now = new Date();
  const [data, setData] = useState<AllLawsuitType | null>(null);
  const caseId = useRecoilValue(caseIdState);
  const user = useRecoilValue(userState);
  const [emails, setEmails] = useRecoilState(downPaymentShareEmailsState);
  const setDownPaymentShareSelectPopUpOpen = useSetRecoilState(
    downPaymentSharePopUpOpenState,
  );
  const setPdfUploadLoading = useSetRecoilState(
    downPaymentPDFUploadLoadingState,
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSuccessRequest: RequestSuccessHandler = async (res) => {
      const body: AllLawsuitType = res.data;
      setData(body);
    };
    requestDeprecated("GET", `/lawsuits/${caseId}/print`, {
      onSuccess: handleSuccessRequest,
    });
  }, [ref]);

  useEffect(() => {
    (async () => {
      if (data !== null) {
        if (ref.current) {
          const canvas = await html2canvas(ref.current);
          const imgWidth = 210;
          const pageHeight = 297;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;
          heightLeft -= pageHeight;
          const doc = new jsPDF("p", "mm");
          doc.addImage(
            canvas,
            "PNG",
            0,
            position,
            imgWidth,
            imgHeight,
            "",
            "FAST",
          );
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(
              canvas,
              "PNG",
              0,
              position,
              imgWidth,
              imgHeight,
              "",
              "FAST",
            );
            heightLeft -= pageHeight;
          }
          // doc.save("사건 관리 서비스.pdf");
          // doc.autoPrint();
          const pdf = doc.output("blob");
          const reader = new FileReader();
          reader.onload = function (event) {
            let data = event.target?.result as string;
            data = data.substring("data:application/pdf;base64,".length);
            requestDeprecated("POST", `/emails/lawsuits/${caseId}/bill`, {
              body: {
                pdfData: data,
                toList: emails,
              },
              onSuccess: () => {},
              onFail: () => {},
            });
          };
          reader.readAsDataURL(pdf);

          setDownPaymentShareSelectPopUpOpen(false);
          setEmails([]);
          setPdfUploadLoading("complete");
        }
      }
    })();
  }, [data]);

  return (
    <>
      <PageLoadingSpinner>업로드</PageLoadingSpinner>
      <div
        style={{
          position: "fixed",
          left: -99999,
          width: "210mm",
        }}
        ref={ref}
      >
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
              <div
                style={{ textAlign: "center", padding: "10px 0", fontSize: 20 }}
              >
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  더존비즈온
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  {user?.name}
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  {user?.phone}
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  {data?.lawsuit.clients[0].name}
                  {data?.lawsuit.clients.length ?? 0 > 1
                    ? ` 외 ${data?.lawsuit.clients.length ?? 0}명`
                    : ""}
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  {data?.lawsuit.clients[0].phone ?? ""}
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  color: "rgb(30,145,251)",
                  fontSize: 20,
                  marginBottom: 5,
                }}
              >
                <b>O</b> 안내문
              </div>
              <div style={{ marginBottom: 40 }}>
                <div style={{ paddingLeft: 5, marginBottom: 5 }}>
                  안녕하세요, 법무법인 더존비즈온 입니다.
                </div>
                <div>
                  고객님께서 의뢰하신 <b>{data?.lawsuit.name}</b>에 대한
                  계약금을 청구합니다.
                </div>
              </div>
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: 20, marginBottom: 5 }}>청구내용</div>
                <div>
                  <div style={{ paddingLeft: 5, marginBottom: 5 }}>
                    계약금:{" "}
                    <b>{delimiter(data?.lawsuit.commissionFee ?? 0)} 원</b>
                  </div>
                  <div style={{ paddingLeft: 5, marginBottom: 5 }}>
                    성공보수:{" "}
                    <b>{delimiter(data?.lawsuit.contingentFee ?? 0)} 원</b>
                  </div>
                  <div style={{ paddingLeft: 5, marginBottom: 5 }}>
                    총 합산:{" "}
                    <b>
                      {delimiter(
                        (data?.lawsuit.contingentFee ?? 0) +
                          (data?.lawsuit.commissionFee ?? 0),
                      )}{" "}
                      원
                    </b>
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
                계좌 입금 : OO은행 <b>OOO-OOO-OOOOOOO</b>
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
                <b>{now.getFullYear()}</b>년{" "}
                <b>{String(now.getMonth() + 1).padStart(2, "0")}</b>월{" "}
                <b>{String(now.getDate()).padStart(2, "0")}</b>일
              </div>
              <div style={{ fontSize: 22 }}>
                법무법인 더존비즈온 {user?.name ?? ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DownPaymentPDFShareComponent;
