import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import caseInfoState from "../../../../../states/case/info/caseInfoState.tsx";
import { DetailAdviceType, IdNameType } from "../AdviceListTable.tsx";

function AdviceEditPopUp() {
  /*const [advice, setAdvice] = useState<Advice | null>();*/
  /*const [adviceInfo, setAdviceInfo] = useRecoilState(adviceInfoState);*/
  const caseInfo = useRecoilValue(caseInfoState);
  const [adviceId] = useRecoilState(adviceIdState);
  const [caseId] = useRecoilState(caseIdState);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [clients, setClients] = useState<IdNameType[]>([]);
  const [members, setMembers] = useState<IdNameType[]>([]);
  const [advicedAt, setadvicedAt] = useState<string | null>(null);
  const setAdviceEditPopUpOpen = useSetRecoilState(adviceEditPopUpOpenState);

  const handleCloseButtonClick = () => {
    setAdviceEditPopUpOpen(false);
  };

  useEffect(() => {
    getAdviceInfo();
  }, [adviceId]);
  const getAdviceInfo = () => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const data: DetailAdviceType = res.data;
      console.log("dd", data);
      setTitle(data.title);
      setContents(data.contents);
      setClients(data.clients);
      setMembers(data.members);
      setadvicedAt(data.advicedAt);
    };
    const handleRequestFail: RequestFailHandler = (e) => {
      console.dir(e);
      // alert((e.response.data as { code: string; message: string }).message);
    };
    requestDeprecated("GET", `/advices/${adviceId}`, {
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  const handleRequestSuccess: RequestSuccessHandler = (res) => {};
  requestDeprecated("GET", `/advices?lawsuit=${caseId}`, {
    withToken: true,
    onSuccess: handleRequestSuccess,
  });

  const handleEditButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      setAdviceEditPopUpOpen(false);
    };
    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };
    setClients([]);
    setMembers([]);
    setTitle("");
    setContents("");
    setadvicedAt("");
    requestDeprecated("PUT", `advices/${adviceId}`, {
      withToken: true,
      body: {
        lawsuitId: caseId,
        clientIdList: clients,
        memberIdList: setMembers,
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
        상담 수정
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="member">상담관</InputLabel>
        <Select
          labelId="member"
          label="상담관"
          multiple
          value={members.map((item) => item.name)}
          onChange={(e) => {
            return [];
          }}
        >
          {caseInfo?.employees.map((data) => (
            <MenuItem key={data.id} value={data.id}>
              {data.name}
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
          value={clients}
          onChange={(e) => setClients(e.target.value as string[])}
        >
          {caseInfo?.clients.map((data) => (
            <MenuItem key={data.id} value={data.id}>
              {data.name}
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
        수정
      </Button>
    </PopUp>
  );
}

export default AdviceEditPopUp;
