import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import adviceIdState from "../../../../../states/advice/AdviceIdState.tsx";
import caseIdState from "../../../../../states/case/CaseIdState.tsx";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import adviceEditPopUpOpenState from "../../../../../states/advice/adviceEditPopUpOpenState.tsx";

import PopUp from "../../../../common/PopUp.tsx";
import CloseButton from "../../../../common/CloseButton.tsx";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Advicedata } from "../../../../../type/ResponseType.ts";

type Advice = {
  id: number;
  title: string;
  contents: string;
  advicedAt: string;
  memberId: string[];
  clientId: string[];
};

type Props = {
  advices: Advicedata[];
};
function AdviceEditPopUp({ advices }: Props) {
  const [advice, setAdvice] = useState<Advice | null>();
  const [adviceId] = useRecoilState(adviceIdState);
  const [caseId] = useRecoilState(caseIdState);
  const [title, setTitle] = useState(advice?.title ?? "");
  const [contents, setContents] = useState(advice?.contents ?? "");
  const [clientIdList, setClientIdList] = useState<string[]>(
    advice?.clientId.map((item: any) => item.id) ?? [],
  );
  const [memberIdList, setMemberIdList] = useState<string[]>(
    advice?.memberId.map((item: any) => item.id) ?? [],
  );
  const [advicedAt, setadvicedAt] = useState<string | null>(
    advice?.advicedAt ?? null,
  );
  const setAdviceEditPopUpOpen = useSetRecoilState(adviceEditPopUpOpenState);

  const handleCloseButtonClick = () => {
    setAdviceEditPopUpOpen(false);
  };

  const handleEditButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      console.log("첫번째 성공");
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        console.log("request success2");
        const data: Advice = res.data;
        console.log("data");
        console.log(data);
        setAdvice(data);
        console.log(advice);
        setAdviceEditPopUpOpen(false);
      };
      const handleRequestFail2: RequestFailHandler = (e) => {
        alert((e.response.data as { code: string; message: string }).message);
      };
      requestDeprecated("GET", `/advices/${adviceId}`, {
        onSuccess: handleRequestSuccess2,
        onFail: handleRequestFail2,
      });
    };
    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };
    setClientIdList([]);
    setMemberIdList([]);
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
      onFail: handleRequestFail,
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
          onChange={(e) => setMemberIdList(e.target.value as string[])}
        >
          {advices?.map((data) => (
            <MenuItem key={data.id} value={data.id}>
              {data.memberId}
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
          onChange={(e) => setClientIdList(e.target.value as string[])}
        >
          {advices?.map((data) => (
            <MenuItem key={data.id} value={data.id}>
              {data.clientId}
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

      <Button variant="contained" size="large" onClick={handleEditButtonClick}>
        등록
      </Button>
    </PopUp>
  );
}

export default AdviceEditPopUp;
