import { ReactNode, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import loadingState from "../../../../states/layout/LoadingState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated.ts";
import caseIdState from "../../../../states/case/CaseIdState.tsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type AllLawsuitType = {
  lawsuit: {
    id: number;
    name: string; // ㅇ
    num: string; // ㅇ
    court: string; // ㅇ
    commissionFee: number; // ㅇ
    contingentFee: number; // ㅇ
    judgementResult: string; // ㅇ
    judgementDate: string; // ㅇ
  };
  advices: {
    id: number; // ㅇ
    title: string; // ㅇ
    contents: string; // ㅇ
    date: string; // ㅇ
    memberNames: string[]; // ㅇ
    clientNames: string[]; // ㅇ
  }[];
  expenses: {
    id: number;
    contents: string; // ㅇ
    amount: number; // ㅇ
    date: string; // ㅇ
  }[];
};

function Page({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        border: "1px solid black",
      }}
    >
      {children}
    </div>
  );
}

function Property({
  title,
  contents,
}: {
  title: ReactNode;
  contents: ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <div>{title}</div>
      <div>{contents}</div>
    </div>
  );
}

function PrintComponent() {
  const [data, setData] = useState<AllLawsuitType | null>(null);
  const caseId = useRecoilValue(caseIdState);
  const setLoading = useSetRecoilState(loadingState);
  const ref = useRef<HTMLDivElement>(null);
  // const data: AllLawsuitType = {
  //   lawsuit: {
  //     id: 0,
  //     name: "사건 이름",
  //     num: "사건 번호",
  //     court: "법원 이름",
  //     commissionFee: 0,
  //     contingentFee: 0,
  //     judgementResult: "원고승",
  //     judgementDate: "2018-01-01",
  //   },
  //   advices: [
  //     {
  //       id: 0,
  //       title: "상담 제목1",
  //       contents: "상담 내용1",
  //       date: "2023-09-01",
  //       memberNames: ["상담자1", "상담자2"],
  //       clientNames: ["고객1, 고객2"],
  //     },
  //     {
  //       id: 1,
  //       title: "상담 제목2",
  //       contents: "상담 내용2",
  //       date: "2023-09-02",
  //       memberNames: ["상담자1", "상담자2"],
  //       clientNames: ["고객1, 고객2"],
  //     },
  //   ],
  //   expenses: [
  //     {
  //       id: 0,
  //       contents: "지출 내용1",
  //       amount: 0,
  //       date: "2023-09-01",
  //     },
  //     {
  //       id: 1,
  //       contents: "지출 내용2",
  //       amount: 0,
  //       date: "2023-09-02",
  //     },
  //   ],
  // };

  useEffect(() => {
    const handleSuccessRequest: RequestSuccessHandler = async (res) => {
      const body: AllLawsuitType = res.data;
      setData(body);
    };
    requestDeprecated("GET", `/lawsuits/${caseId}/print`, {
      useMock: false,
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
          doc.output("dataurlnewwindow", { filename: "사건 관리 서비스" });
          setLoading({
            text: "출력 준비 중",
            isLoading: false,
          });
        }
      }
    })();
  }, [data]);

  return (
    <div
      style={{
        position: "fixed",
        right: -99999,
        width: "210mm",
      }}
      ref={ref}
    >
      <Page>
        <Property title="사건" contents={data?.lawsuit.name} />
        <Property title="사건번호" contents={data?.lawsuit.num} />
        <Property title="법원" contents={data?.lawsuit.court} />
        <Property title="의뢰비" contents={data?.lawsuit.commissionFee} />
        <Property title="성공보수" contents={data?.lawsuit.contingentFee} />
        <Property title="판단결과" contents={data?.lawsuit.judgementResult} />
        <Property title="판단날짜" contents={data?.lawsuit.judgementDate} />
      </Page>
      <Page>
        {data?.advices.map((item) => (
          <div>
            <Property title="제목" contents={item.title} />
            <Property title="내용" contents={item.contents} />
            <Property title="날짜" contents={item.date} />
            <Property title="담당자" contents={item.memberNames.join(", ")} />
            <Property title="당사자" contents={item.clientNames.join(", ")} />
          </div>
        ))}
      </Page>
      <Page>
        {data?.expenses.map((item) => (
          <div>
            <Property title="내용" contents={item.contents} />
            <Property title="비용" contents={item.amount} />
            <Property title="날짜" contents={item.date} />
          </div>
        ))}
      </Page>
    </div>
  );
}

export default PrintComponent;
