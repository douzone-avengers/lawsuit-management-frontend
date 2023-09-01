import PopUp from "../../common/PopUp.tsx";
import CloseButton from "../../common/CloseButton.tsx";
import { Button } from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import caseBookSharePopUpOpenState from "../../../states/case/info/closing/CaseBookSharePopUpOpenState.ts";
import { useEffect, useState } from "react";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import { CaseInfoType } from "../../../states/case/info/caseInfoState.tsx";
import caseBookPDFUploadLoadingState from "../../../states/case/info/closing/CaseBookPDFUploadLoadingState.tsx";
import caseBookShareEmailsState from "../../../states/case/info/closing/CaseBookShareEmailsState.ts";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import { produce } from "immer";
import TextField from "@mui/material/TextField";
import "../../../stylesheet/custom.css";

function CaseBookSharePopUp() {
  const caseId = useRecoilValue(caseIdState);
  const [text, setText] = useState("");
  const [invalidText, setInvalidText] = useState(false);
  const [errTextMsg, setErrTextMsg] = useState("");
  const [emails, setEmails] = useRecoilState(caseBookShareEmailsState);
  const setUploadLoading = useSetRecoilState(caseBookPDFUploadLoadingState);

  const setCaseBookShareSelectPopUpOpen = useSetRecoilState(
    caseBookSharePopUpOpenState,
  );

  const handleCloseButtonClick = () => {
    setCaseBookShareSelectPopUpOpen(false);
  };

  const handleShareButtonClick = () => {
    setUploadLoading("loading");
    1;
  };

  const handleAddEmail = () => {
    if (emails.some((item) => item === text)) {
      setInvalidText(true);
      setErrTextMsg("이미 존재하는 이메일입니다.");
      setText("");
      return;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(text)) {
      setInvalidText(true);
      setErrTextMsg("올바르지 않은 이메일 형식입니다.");
      setText("");
      return;
    }
    setEmails([...emails, text]);
    setText("");
  };

  useEffect(() => {
    requestDeprecated("GET", `/lawsuits/${caseId}/basic`, {
      onSuccess: (res) => {
        const body: CaseInfoType = res.data;
        const clientEmails = body.clients.map((item) => item.email);
        setEmails(clientEmails);
      },
    });
  }, []);

  return (
    <PopUp width={420}>
      <CloseButton onClick={handleCloseButtonClick} />
      <Box
        sx={{
          height: 80,
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        <TextField
          sx={{
            flexGrow: 1,
          }}
          error={invalidText}
          helperText={errTextMsg}
          label="이메일"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            setInvalidText(false);
            setErrTextMsg("");
            if (e.key === "Enter") {
              handleAddEmail();
            }
          }}
        />
      </Box>
      <Card>
        <List
          className="custom-scroll-bar"
          sx={{ height: 240, paddingLeft: 1, overflow: "scroll" }}
        >
          {emails.map((item) => (
            <ListItem
              key={item}
              disablePadding
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <EmailIcon sx={{ color: "gray" }} />
                <ListItemText primary={item} />
              </Box>
              <IconButton
                onClick={() => {
                  const newEmails = produce(emails, (draft) =>
                    draft.filter((newItem) => newItem !== item),
                  );
                  setEmails(newEmails);
                }}
              >
                <DeleteIcon sx={{ color: "gray" }} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Card>
      <Button size="large" variant="contained" onClick={handleShareButtonClick}>
        공유
      </Button>
    </PopUp>
  );
}

export default CaseBookSharePopUp;
