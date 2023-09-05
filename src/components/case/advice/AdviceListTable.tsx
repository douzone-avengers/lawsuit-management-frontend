import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Advicedata } from "../../../type/ResponseType.ts";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import AdviceRemovePopUpButton from "./AdviceRemovePopUpButton.tsx";

type Advice = {
  id: number;
  title: string;
  contents: string;
  advicedAt: string;
  memberId: string[];
  clientId: string[];
};

type Props = {
  advices: Advicedata[];
};

function AdviceListTable({ advices }: Props) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const maxContentLength = 20;
  const [advice, setAdvice] = useState<Advice | null>();

  const trimContent = (content: string) => {
    if (content.length <= maxContentLength) {
      return content;
    } else {
      return content.slice(0, maxContentLength) + " ...";
    }
  };
  const adviceRequest = (adviceId: number) => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: Advice = res.data;
      console.dir(body);
      setAdvice(body);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };
    requestDeprecated("GET", `/advices/${adviceId}`, {
      withToken: true,
      onSuccess: handleRequestSuccess,
      onFail: handelRequestFail,
    });
  };

  const handleExpandClick = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
      adviceRequest(advices[index].id);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">상담 제목</TableCell>
            <TableCell align="left">상담 내용</TableCell>
            <TableCell align="left">상담 일시</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {advices.map((item, index) => (
            <>
              <TableRow
                key={item.id}
                hover={true}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={() => handleExpandClick(index)}
              >
                <TableCell>
                  <IconButton>
                    {expandedRow === index ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell align="left">{item.title}</TableCell>
                <TableCell align="left">{trimContent(item.contents)}</TableCell>
                <TableCell align="left">
                  {new Date(item.advicedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
              {expandedRow === index && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <div>
                      <AdviceRemovePopUpButton />
                    </div>
                    <div
                      style={{
                        maxHeight: "300px",
                        maxWidth: "300px",
                        overflowY: "auto",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      상담 제목:{advice?.title}
                      <br />
                      상담 내용: {advice?.contents} <br />
                      상담 일시: {advice?.advicedAt} <br />
                      상담관: {advice?.memberId.join(", ")} <br />
                      상담자: {advice?.clientId.join(", ")} <br />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdviceListTable;
