import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import adviceRegisterPopUpOpenState from "../../../states/advice/AdviceRegisterPopUpOpenState.tsx";
import adviceIdState from "../../../states/advice/AdviceState.tsx";
import CloseButton from "../../common/CloseButton.tsx";
import PopUp from "../../common/PopUp.tsx";
import "../../../stylesheet/calendar.css";
import { Advicedata } from "../../../type/ResponseType.ts";
import caseInfoState from "../../../states/case/info/caseInfoState.tsx";
import caseIdState from "../../../states/case/CaseIdState.tsx";
//import { DatePicker } from "@mui/x-date-pickers";

type Props = {
  setAdvices: React.Dispatch<React.SetStateAction<Advicedata[]>>;
};

function AdviceRegisterPopUp({ setAdvices }: Props) {
  const caseInfo = useRecoilValue(caseInfoState);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [clientIdList, setclientIdList] = useState<string[]>([]);
  const [memberIdList, setmemberIdList] = useState<string[]>([]);
  const [advicedAt, setadvicedAt] = useState<string | null>(null);
  // const [_, setAdvices] = useState<Advicedata[]>([]);
  const setAdviceId = useSetRecoilState(adviceIdState);
  const caseId = useRecoilValue(caseIdState);

  const setAdviceRegisterPopUpOpen = useSetRecoilState(
    adviceRegisterPopUpOpenState,
  );

  const handleCloseButtonClick = () => {
    setAdviceRegisterPopUpOpen(false);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 15) {
      setTitle(newTitle);
    } else {
      alert("상담 제목은 최대 15자까지 가능합니다.");
    }
  };

  const handleRegisterButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        const body: Advicedata[] = res.data;
        setAdvices(body);
        setAdviceId(body[0]?.id);
      };
      requestDeprecated("GET", `/advices?lawsuit=${caseId}`, {
        withToken: true,
        onSuccess: handleRequestSuccess2,
      });
    };
    setAdviceRegisterPopUpOpen(false);
    setclientIdList([]);
    setmemberIdList([]);
    setTitle("");
    setContents("");
    setadvicedAt("");
    requestDeprecated("POST", "/advices", {
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
          {caseInfo?.employees.map((employees) => (
            <MenuItem key={employees.id} value={employees.id}>
              {employees.name}
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
          {caseInfo?.clients.map((clients) => (
            <MenuItem key={clients.id} value={clients.id}>
              {clients.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="text"
        size="small"
        label="상담 제목(15글자 이하)"
        value={title}
        onChange={handleTitleChange}
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
        onClick={handleRegisterButtonClick}
      >
        등록
      </Button>
    </PopUp>
  );
}

export default AdviceRegisterPopUp;
