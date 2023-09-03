import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import adviceIdState from "../../../states/advice/AdviceState.tsx";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import adviceRemovePopUpOpenState from "../../../states/advice/adviceRemovePopUpOpenState.tsx";
import { AllLawsuitType } from "../closing/print/PdfComponent.tsx";
import PopUp from "../../common/PopUp.tsx";
import CloseButton from "../../common/CloseButton.tsx";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AdviceRemovePopUp() {
  const [data, setData] = useState<AllLawsuitType | null>(null);
  const [adviceId] = useRecoilState(adviceIdState);
  const [caseId] = useRecoilState(caseIdState);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [clientIdList, setclientIdList] = useState<string[]>([]);
  const [memberIdList, setmemberIdList] = useState<string[]>([]);
  const [advicedAt, setadvicedAt] = useState<string | null>(null);
  const setAdviceRemovePopUpOpen = useSetRecoilState(
    adviceRemovePopUpOpenState,
  );
  const handleCloseButtonClick = () => {
    setAdviceRemovePopUpOpen(false);
  };
  const handleRemoveButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        const body: AllLawsuitType = res.data;
        console.log(adviceId);
        setData(body);
      };
      requestDeprecated("GET", `/lawsuits/${caseId}/print`, {
        withToken: true,
        onSuccess: handleRequestSuccess2,
      });
    };
    setAdviceRemovePopUpOpen(false);
    setclientIdList([]);
    setmemberIdList([]);
    setTitle("");
    setContents("");
    setadvicedAt("");
    requestDeprecated("PATCH", `advices/${adviceId}`, {
      withToken: true,
      body: {
        lawsuitId: caseId,
        clientIdList,
        memberIdList,
        title,
        contents,
        advicedAt,
      },
      onSuccess: handleRequestSuccess,
    });
  };
  return (
    <PopUp width={600}>
      <CloseButton onClick={handleCloseButtonClick} />
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        상담 등록
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="member">상담관</InputLabel>
        <Select
          labelId="member"
          label="상담관"
          multiple
          value={memberIdList}
          onChange={(e) => setmemberIdList(e.target.value as string[])}
        >
          {data?.advices.map((data) => (
            <MenuItem key={data.id} value={data.id}>
              {data.memberNames}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="client">상담자</InputLabel>
        <Select
          labelId="client"
          label="상담자"
          multiple
          value={clientIdList}
          onChange={(e) => setclientIdList(e.target.value as string[])}
        >
          {data?.advices.map((data) => (
            <MenuItem key={data.id} value={data.id}>
              {data.clientNames}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="text"
        size="small"
        label="상담 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        type="text"
        size="medium"
        label="상담 내용"
        multiline
        rows={7}
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <TextField
        type="date"
        size="medium"
        value={advicedAt}
        onChange={(e) => setadvicedAt(e.target.value)}
      />

      <Button
        variant="contained"
        size="large"
        onClick={handleRemoveButtonClick}
      >
        등록
      </Button>
    </PopUp>
  );
}

export default AdviceRemovePopUp;
