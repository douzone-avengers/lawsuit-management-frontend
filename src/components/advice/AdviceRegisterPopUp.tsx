import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Advicedata } from "../../mock/advice/adviceTable.ts";
import adviceRegisterPopUpOpenState from "../../states/advice/AdviceRegisterPopUpOpenState.tsx";
import adviceIdState from "../../states/advice/AdviceState.tsx";
import CloseButton from "../common/CloseButton.tsx";
import PopUp from "../common/PopUp.tsx";
import "../../stylesheet/calendar.css";
function AdviceRegisterPopUp() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [Clients, setClients] = useState<string[]>([]);
  const [Members, setMembers] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [_, setAdvices] = useState<Advicedata[]>([]);
  const setAdviceId = useSetRecoilState(adviceIdState);

  const setAdviceRegisterPopUpOpen = useSetRecoilState(
    adviceRegisterPopUpOpenState,
  );

  const handleCloseButtonClick = () => {
    setAdviceRegisterPopUpOpen(false);
  };

  const handleRegisterButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: Advicedata[] } = res.data;
      const { data } = body;
      setAdvices(data);
      setAdviceId(data[0]?.id);
    };
    setAdviceRegisterPopUpOpen(false);

    setTitle("");
    setContents("");
    setDate("");
    request("POST", "/advices", {
      body: {
        title,
        contents,
        date,
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
          value={Members}
          onChange={(e) => setMembers(e.target.value as string[])}
        >
          <MenuItem value={0}>김세종</MenuItem>
          <MenuItem value={1}>박지혁</MenuItem>
          <MenuItem value={2}>오경민</MenuItem>
          <MenuItem value={3}>한상진</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="client">상담자</InputLabel>
        <Select
          labelId="client"
          label="상담자"
          multiple
          value={Clients}
          onChange={(e) => setClients(e.target.value as string[])}
        >
          <MenuItem value={0}>홍길동</MenuItem>
          <MenuItem value={1}>김철수</MenuItem>
          <MenuItem value={2}>이영희</MenuItem>
          <MenuItem value={3}>박민준</MenuItem>
          <MenuItem value={4}>정수빈</MenuItem>
          <MenuItem value={5}>신지아</MenuItem>
          <MenuItem value={6}>윤영호</MenuItem>
          <MenuItem value={7}>최지수</MenuItem>
          <MenuItem value={8}>배예진</MenuItem>
          <MenuItem value={9}>강민수</MenuItem>
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
        value={date}
        onChange={(e) => setDate(e.target.value)}
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
