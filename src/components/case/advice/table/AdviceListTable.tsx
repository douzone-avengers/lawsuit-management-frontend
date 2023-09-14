import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Advicedata } from "../../../../type/ResponseType.ts";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import requestDeprecated, {
  RequestFailHandler,
} from "../../../../lib/requestDeprecated.ts";
import TextField from "@mui/material/TextField";
import AdviceEditPopUpButton from "./button/AdviceEditPopUpButton.tsx";
import { IdNameType } from "../../../../states/advice/adviceInfoState.tsx";

export type DetailAdviceType = {
  adviceId: number;
  title: string;
  contents: string;
  advicedAt: string;
  members: IdNameType[];
  clients: IdNameType[];
};

type Props = {
  advices: Advicedata[];
};

function AdviceListTable({ advices }: Props) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const maxContentLength = 20;
  const [advice, setAdvice] = useState<DetailAdviceType | null>();
  const trimContent = (content: string) => {
    if (content.length <= maxContentLength) {
      return content;
    } else {
      return content.slice(0, maxContentLength) + " ...";
    }
  };
  const adviceRequest = (adviceId: number) => {
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };
    requestDeprecated("GET", `/advices/${adviceId}`, {
      withToken: true,
      onSuccess: (res) => {
        const body: DetailAdviceType = res.data;
        console.log(body);
        setAdvice(body);
      },
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
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {advices.map((item, index) => (
            <>
              <TableRow
                key={item.id}
                hover={true}
                onClick={() => {
                  handleExpandClick(index);
                }}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                  backgroundColor:
                    expandedRow === index ? "grey.300" : "inherit",
                }}
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
                <TableCell align="left">{trimContent(item.title)}</TableCell>
                <TableCell align="left">{trimContent(item.contents)}</TableCell>
                <TableCell align="left">
                  {new Date(item.advicedAt).toLocaleDateString()}
                </TableCell>
                {true && (
                  <TableCell align="center">
                    <div>
                      <AdviceEditPopUpButton curAdviceId={item.id} />
                    </div>
                  </TableCell>
                )}
              </TableRow>
              {expandedRow === index && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px 30px 10px 30px",
                      }}
                    >
                      <TextField
                        style={{ margin: "10px 0" }}
                        label="상담 제목"
                        value={advice?.title}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        style={{ margin: "10px 0" }}
                        label="상담 날짜"
                        value={advice?.advicedAt}
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {advice && (
                        <TextField
                          style={{ margin: "10px 0" }}
                          label="상담관"
                          value={advice.members
                            .map((item) => item.name)
                            .join(", ")}
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                      {advice && (
                        <TextField
                          style={{ margin: "10px 0" }}
                          label="상담자"
                          value={advice.clients
                            .map((item) => item.name)
                            .join(", ")}
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                      <TextField
                        style={{ margin: "10px 0" }}
                        label="상담 내용"
                        value={advice?.contents}
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        rows={4}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
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
