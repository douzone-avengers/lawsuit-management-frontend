import { useRecoilValue, useSetRecoilState } from "recoil";
import adviceDeletePopUpOpenState from "../../../../../states/advice/adviceDeletePopUpOpenState.tsx";
import adviceIdState from "../../../../../states/advice/AdviceIdState.tsx";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import PopUp from "../../../../common/PopUp.tsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Advicedata } from "../../../../../type/ResponseType.ts";
import React from "react";
import caseIdState from "../../../../../states/case/CaseIdState.tsx";

type Props = {
  setAdvices: React.Dispatch<React.SetStateAction<Advicedata[]>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

function AdviceDeletePopUp({ setAdvices, setCount }: Props) {
  const setAdviceDeletePopUpOpen = useSetRecoilState(
    adviceDeletePopUpOpenState,
  );
  const adviceId = useRecoilValue(adviceIdState);
  const caseId = useRecoilValue(caseIdState);
  const setAdviceId = useSetRecoilState(adviceIdState);

  const handleDeleteButtonClick = () => {
    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };
    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        const data = res.data;
        const adviceList: Advicedata[] = data.adviceDtoList;
        setAdvices(adviceList);
        setAdviceId(adviceList[0]?.id);
        setCount(data.count);
      };
      requestDeprecated("GET", `/advices/lawsuits/${caseId}`, {
        params: {
          curPage: "1",
          rowsPerPage: "5",
        },
        withToken: true,
        onSuccess: handleRequestSuccess2,
      });
      setAdviceDeletePopUpOpen(false);
    };
    console.log("adviceID", adviceId);
    requestDeprecated("PATCH", `/advices/${adviceId}`, {
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  const handleCloseButtonClick = () => {
    setAdviceDeletePopUpOpen(false);
  };

  return (
    <>
      <PopUp width={480} popUpType="alert">
        <DialogTitle>해당 상담 삭제하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleDeleteButtonClick}>
            예
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseButtonClick}
            sx={{
              background: "#ef5350",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
          >
            아니오
          </Button>
        </DialogActions>
      </PopUp>
    </>
  );
}

export default AdviceDeletePopUp;
