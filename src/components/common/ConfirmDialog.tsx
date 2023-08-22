import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

type Props = {
  openStatus: boolean;
  setOpenStatus: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  text: string;
  agreeAction?: () => Promise<any>; //확인버튼 클릭 시
  disagreeAction?: () => void; //취소 버튼 클릭 시
};

export default function ConfirmDialog({
  openStatus,
  setOpenStatus,
  title,
  text,
  agreeAction,
}: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClickAgree = async () => {
    setIsLoading(true);
    if (agreeAction) {
      try {
        await agreeAction(); // agreeAction이 완료될 때까지 기다립니다.
      } catch (error) {
        console.error("Error occurred during agreeAction:", error);
      }
    }
    setOpenStatus(false);
    setIsLoading(false);
  };

  const handleClickDisagree = () => {
    setOpenStatus(false);
  };

  return (
    <Dialog open={openStatus} onClose={handleClickDisagree}>
      <DialogTitle>{title}</DialogTitle>
      {isLoading ? (
        <DialogContent>
          <CircularProgress size={24} />
          <DialogContentText>이메일 전송 중입니다...</DialogContentText>
        </DialogContent>
      ) : (
        <>
          <DialogContent>
            <DialogContentText
              dangerouslySetInnerHTML={{ __html: text }}
            ></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickDisagree} color="primary">
              취소
            </Button>
            <Button onClick={handleClickAgree} color="primary">
              확인
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
