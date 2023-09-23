import Box from "@mui/material/Box";
import { CaseExpenseBillRowType } from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillState.tsx";

type Props = {
  item: CaseExpenseBillRowType & { editable: boolean };
};

function CaseExpenseBillShowNameCell({ item }: Props) {
  const handleDownloadClick = async (fileId: number) => {
    // 브라우저가 Blob을 지원하는지 여부 체크
    // const blobSupported = new Blob(["ä"]).size === 2; // Boolean
    // console.dir(blobSupported);

    // 브라우저가 Blob  URL을 지원하는지 여부 체크
    // const blobSupported = "URL" in window && "createObjectURL" in window.URL;
    // console.log("Blob URL Supported:", blobSupported);

    // 파일의 실제 다운로드 경로
    const fileUrl = `https://lawsuit-management.store/files/download/${fileId}`;
    // 사용자의 토큰 저장
    const token = localStorage.getItem("accessToken");

    if (token) {
      const response = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // 파일 데이터를 Blob으로 처리 -> 이미지 데이터를 브라우저에서 처리하도록 하는 것으로 브라우저의 내장 기능 활용 가능
      const blob = await response.blob();
      // 파일 데이터를 읽기 위한 객체 생성
      const reader = new FileReader();
      // 서버 response header에서 파일 정보가 들어있는 'content-disposition' 헤더 값 가져옴
      const contentDisposition = response.headers.get("content-disposition");

      // 파일 정보가 없으면 return
      if (!contentDisposition) {
        return;
      }

      // 파일 이름 디코딩하여 추출
      const fileName = decodeURIComponent(
        contentDisposition.split("UTF-8''")[1],
      );

      reader.readAsArrayBuffer(blob); // blob 객체 읽어들임

      // 파일 데이터를 Blob으로 변환한 후 브라우저에서 다운로드할 수 있는 링크 생성
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer; // 읽은 blob 객체 ArrayBuffer에 저장
        const uint8Array = new Uint8Array(arrayBuffer); // 바이너리 데이터를 다루기 위한 배열 형태로 변환
        const downloadLink = document.createElement("a"); // 다운로드 링크인 <a> 태그 생성
        downloadLink.href = URL.createObjectURL(new Blob([uint8Array])); // 파일 데이터를 포함한 새로운 'Blob' 객체를 가리키는 URL 생성
        downloadLink.download = fileName; // 다운로드될 파일 이름 설정
        document.body.appendChild(downloadLink);
        downloadLink.click(); // 해당 downloadLink 클릭되도록하는 함수
        document.body.removeChild(downloadLink); // download 후 해당 downloadLink 제거
      };
    }
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        paddingTop: 1,
        textAlign: "center",
        color: "rgba(0, 0, 0, 0.54)",
      }}
      onClick={() => {
        handleDownloadClick(item.id);
      }}
    >
      {item.showFileName + "." + item.extension}
    </Box>
  );
}

export default CaseExpenseBillShowNameCell;
