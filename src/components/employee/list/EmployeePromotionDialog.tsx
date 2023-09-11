import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, TextField } from "@mui/material";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated";
import NormalDialog from "../../common/dialog/NormalDialog";

export default function EmployeePromotionDialog() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [promotionKey, setPromotionKey] = React.useState("");
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isResultOpen, setIsResultOpen] = React.useState(false);

  const [email, setEmail] = useState("");
  const [isEmailOk, setIsEmailOk] = useState(true);
  const [emailMessage, setEmailMessage] = useState("");

  //직원초대
  const requestCreateEmployeePromotion = () => {
    return new Promise((resolve, reject) => {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        setPromotionKey(res.data);
        setIsResultOpen(true);
        resolve(res); // 작업이 성공적으로 완료되면 resolve를 호출합니다.
      };

      const handelRequestFail: RequestFailHandler = (e) => {
        alert((e.response.data as { code: string; message: string }).message);
        reject(e); // 에러 발생 시 reject를 호출합니다.
      };

      requestDeprecated("POST", `/promotions/employees`, {
        withToken: true,
        params: {
          emailTo: email,
        },
        onSuccess: handleRequestSuccess,
        onFail: handelRequestFail,
      });
    });
  };

  const handleClickAgree = async () => {
    setIsLoading(true);
    try {
      await requestCreateEmployeePromotion();
    } catch (error) {
    } finally {
      setIsFormOpen(false);
      setEmail("");
      setIsEmailOk(false);
      setEmailMessage("");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 1초 후에 setIsLoading(false) 실행
    }
  };

  const handleClickDisagree = () => {
    setIsFormOpen(false);
    setEmail("");
    setIsEmailOk(false);
    setEmailMessage("");
  };

  const onEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸습니다.");
      setIsEmailOk(false);
    } else {
      setEmailMessage("올바른 이메일 형식입니다.");
      setIsEmailOk(true);
    }
  };

  return (
    <>
      <Dialog open={isFormOpen} onClose={handleClickDisagree}>
        <DialogTitle>직원초대</DialogTitle>
        {isLoading ? (
          <DialogContent>
            <CircularProgress size={24} />
            <DialogContentText>잠시만 기다려 주세요...</DialogContentText>
          </DialogContent>
        ) : (
          <>
            <DialogContent>
              <DialogContentText>
                초대메일을 발송할 이메일을 입력하세요.
              </DialogContentText>
              <TextField
                {...(isEmailOk || !email ? {} : { error: true })}
                autoFocus
                margin="dense"
                label="이메일"
                type="email"
                fullWidth
                variant="standard"
                value={email}
                onChange={onEmailChange}
                helperText={emailMessage}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickDisagree} color="primary">
                취소
              </Button>
              <Button
                onClick={handleClickAgree}
                color="primary"
                disabled={!isEmailOk}
              >
                확인
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <NormalDialog
        openStatus={isResultOpen}
        setOpenStatus={setIsResultOpen}
        title={"직원 초대키 발급 성공"}
        text={`초대키가 발급되었습니다.<br/>발급된 초대키 : <b>${promotionKey}</b>`}
      />

      <Button
        variant="contained"
        onClick={() => {
          setIsFormOpen(true);
        }}
        sx={{ position: "absolute", bottom: 24, right: 24 }}
      >
        직원초대
      </Button>
    </>
  );
}
