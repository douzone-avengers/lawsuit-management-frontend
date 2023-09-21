import PopUp from "../../common/PopUp.tsx";
import CloseButton from "../../common/CloseButton.tsx";
import { Button } from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import { CaseInfoType } from "../../../states/case/info/caseInfoState.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import { produce } from "immer";
import DeleteIcon from "@mui/icons-material/Delete";
import downPaymentShareEmailsState from "../../../states/case/info/closing/DownPaymentShareEmailsState.ts";
import downPaymentPDFUploadLoadingState from "../../../states/case/info/closing/DownPaymentPDFUploadLoadingState.tsx";
import downPaymentSharePopUpOpenState from "../../../states/case/info/closing/DownPaymentSharePopUpOpenState.ts";

function DownPaymentSharePopUp() {
  const caseId = useRecoilValue(caseIdState);
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [errEmail, setErrEmail] = useState("");
  const [emails, setEmails] = useRecoilState(downPaymentShareEmailsState);
  const setUploadLoading = useSetRecoilState(downPaymentPDFUploadLoadingState);

  const setDownPaymentShareSelectPopUpOpen = useSetRecoilState(
    downPaymentSharePopUpOpenState,
  );

  const handleCloseButtonClick = () => {
    setDownPaymentShareSelectPopUpOpen(false);
  };

  const handleShareButtonClick = () => {
    setUploadLoading("loading");
    1;
  };

  const handleAddEmail = () => {
    if (emails.some((item) => item === email)) {
      setInvalidEmail(true);
      setErrEmail("이미 존재하는 이메일입니다.");
      setEmail("");
      return;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setInvalidEmail(true);
      setErrEmail("올바르지 않은 이메일 형식입니다.");
      setEmail("");
      return;
    }
    setEmails([...emails, email]);
    setEmail("");
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
          error={invalidEmail}
          helperText={errEmail}
          label="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            setInvalidEmail(false);
            setErrEmail("");
            if (e.key === "Enter") {
              handleAddEmail();
            }
          }}
        />
        <div style={{ height: 56 }}>
          <Button
            variant="contained"
            sx={{ height: "100%" }}
            onClick={() => {
              setInvalidEmail(false);
              setErrEmail("");
              handleAddEmail();
            }}
          >
            추가
          </Button>
        </div>
      </Box>
      <Card>
        <List sx={{ height: 240, paddingLeft: 1, overflow: "auto" }}>
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

export default DownPaymentSharePopUp;
