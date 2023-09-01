import { ReactNode, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import caseBookPDFUploadLoadingState from "../../../states/case/info/closing/CaseBookPDFUploadLoadingState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { delimiter } from "../../../lib/convert.ts";
import PageLoadingSpinner from "../../layout/PageLoadingSpinner.tsx";
import caseBookShareSelectPopUpOpenState from "../../../states/case/info/closing/CaseBookShareSelectPopUpOpenState.ts";
import caseBookShareEmailsState from "../../../states/case/info/closing/CaseBookShareEmailsState.ts";

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

function CaseBookPDFShareComponent() {
  const [data, setData] = useState<AllLawsuitType | null>(null);
  const caseId = useRecoilValue(caseIdState);
  const [emails, setEmails] = useRecoilState(caseBookShareEmailsState);
  const setCaseBookShareSelectPopUpOpen = useSetRecoilState(
    caseBookShareSelectPopUpOpenState,
  );
  const setPdfUploadLoading = useSetRecoilState(caseBookPDFUploadLoadingState);
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
          const pdf = doc.output("blob");
          const reader = new FileReader();
          reader.onload = function (event) {
            let data = event.target?.result as string;
            data = data.substring("data:application/pdf;base64,".length);
            requestDeprecated("POST", `/emails/lawsuits/${caseId}/book`, {
              body: {
                pdfData: data,
                toList: emails,
              },
              onSuccess: () => {
                console.log("success");
              },
            });
          };
          reader.readAsDataURL(pdf);

          setCaseBookShareSelectPopUpOpen(false);
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
        <Page>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "297mm",
              width: "100%",
            }}
          >
            <h1>1. 사건 정보</h1>
          </div>
        </Page>
        <Page>
          <div
            style={{
              marginTop: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "210mm",
            }}
          >
            <div
              style={{
                width: 700,
              }}
            >
              <Row header="사건명" data={data?.lawsuit.name} />
              <Row header="사건번호" data={data?.lawsuit.num} />
              <Row
                header="당사자"
                data={data?.lawsuit.clients.map((item) => item.name).join(", ")}
              />
              <Row
                header="담당자"
                data={data?.lawsuit.members.map((item) => item.name).join(", ")}
              />
              <Row header="담당법원" data={data?.lawsuit.court} />
              <Row header="판결" data={data?.lawsuit.judgementResult} />
              <Row header="판결일" data={data?.lawsuit.judgementDate} />
              <Row
                header="의뢰비"
                data={`${delimiter(data?.lawsuit.commissionFee ?? 0)}원`}
              />
              <Row
                header="성공보수"
                data={`${delimiter(data?.lawsuit.contingentFee ?? 0)}원`}
              />
            </div>
          </div>
        </Page>
        <Page>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "297mm",
              width: "100%",
            }}
          >
            <h1>2. 상담 정보</h1>
          </div>
        </Page>
        {data?.advices.map((item) => (
          <Page key={item.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "210mm",
              }}
            >
              <div>
                <div
                  style={{
                    width: 700,
                    borderCollapse: "collapse",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "lightgrey",
                      width: 700,
                      height: 50,
                      border: "1px solid black",
                      fontWeight: 700,
                    }}
                  >
                    {item.title}
                  </div>
                  <Row header="상담일" data={item.date} />
                  <Row header="상담관" data={item.memberNames.join(", ")} />
                  <Row header="상담자" data={item.clientNames.join(", ")} />
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "lightgrey",
                        width: 700,
                        height: 50,
                        border: "1px solid black",
                        fontWeight: 700,
                      }}
                    >
                      내용
                    </div>
                    <div
                      style={{
                        border: "1px solid black",
                        height: 770,
                        padding: 20,
                      }}
                    >
                      {item.contents}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Page>
        ))}
        <Page>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "297mm",
              width: "100%",
            }}
          >
            <h1>3. 지출 정보</h1>
          </div>
        </Page>
        <Page>
          <div
            style={{
              marginTop: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "210mm",
            }}
          >
            <div
              style={{
                width: 700,
                display: "flex",
                border: "1px solid black",
              }}
            >
              <TableHeader width={90}>날짜</TableHeader>
              <TableHeader width={500}>내역</TableHeader>
              <TableHeader width={110}>금액</TableHeader>
            </div>
            <div>
              {data?.expenses.map((item) => (
                <div key={item.id} style={{ display: "flex" }}>
                  <div style={{ border: "1px solid black", width: 90 }}>
                    {item.date}
                  </div>
                  <div style={{ border: "1px solid black", width: 500 }}>
                    {item.contents}
                  </div>
                  <div style={{ border: "1px solid black", width: 110 }}>
                    {delimiter(item.amount)}원
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Page>
      </div>
    </>
  );
}

function Row({ header, data }: { header: ReactNode; data: ReactNode }) {
  return (
    <div style={{ display: "flex", border: "1px solid black" }}>
      <div
        style={{
          fontWeight: 700,
          background: "lightgrey",
          width: 200,
          height: 50,
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {header}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "white",
          paddingLeft: 20,
          border: "1px solid black",
          width: 500,
          height: 50,
        }}
      >
        {data}
      </div>
    </div>
  );
}

function Page({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
      }}
    >
      {children}
    </div>
  );
}

function TableHeader({
  width,
  children,
}: {
  width: number;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        background: "lightgrey",

        width,
        border: "1px solid black",
      }}
    >
      {children}
    </div>
  );
}

export default CaseBookPDFShareComponent;
