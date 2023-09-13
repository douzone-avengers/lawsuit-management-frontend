import Box from "@mui/material/Box";
import { CaseExpenseBillRowType } from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillState.tsx";
import { useState } from "react";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";

type Props = {
  item: CaseExpenseBillRowType & { editable: boolean };
};

function CaseExpenseBillShowNameCell({ item }: Props) {
  const [background, setBackground] = useState("white");
  const handleDownloadClick = (fileId: number) => {
    // request해서 파일 데이터 가져오기
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      // 브라우저가 Blob을 지원하는지 여부 체크
      // const blobSupported = new Blob(["ä"]).size === 2; // Boolean
      // console.dir(blobSupported);

      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.download = res.headers["content-disposition"].split("filename=")[1];
      link.href = url;

      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    };

    requestDeprecated("GET", `/files/download/${fileId}`, {
      onSuccess: handleRequestSuccess,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        cursor: "pointer",
        background: background,
      }}
      onClick={() => {
        handleDownloadClick(item.id);
      }}
      onMouseOver={() => {
        setBackground("#DCE8F6");
      }}
      onMouseLeave={() => {
        setBackground("white");
      }}
    >
      {item.showFileName + "." + item.extension}
    </Box>
  );
}

export default CaseExpenseBillShowNameCell;
