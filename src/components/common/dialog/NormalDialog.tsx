import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  openStatus: boolean;
  setOpenStatus: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  text: string;
};

export default function NormalDialog({
  openStatus,
  setOpenStatus,
  title,
  text,
}: Props) {
  const handleClickAgree = async () => {
    setOpenStatus(false);
  };

  return (
    <Dialog open={openStatus} onClose={handleClickAgree}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          dangerouslySetInnerHTML={{ __html: text }}
        ></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickAgree} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
