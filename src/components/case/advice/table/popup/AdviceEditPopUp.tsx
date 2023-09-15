import { useEffect, useState } from "react";
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
import { CaseInfoType } from "../../../../../states/case/info/caseInfoState.tsx";
import { DetailAdviceType } from "../AdviceListTable.tsx";
import adviceInfoState from "../../../../../states/advice/adviceInfoState.tsx";

function AdviceEditPopUp() {
  /*const [advice, setAdvice] = useState<Advice | null>();*/
  const [_, setAdviceInfo] = useRecoilState(adviceInfoState);
  const [caseInfo, setCaseInfo] = useState<CaseInfoType>();
  const [adviceId] = useRecoilState(adviceIdState);
  const [caseId] = useRecoilState(caseIdState);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  // const [clients, setClients] = useState<IdNameType[]>([]);
  // const [members, setMembers] = useState<IdNameType[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [advicedAt, setadvicedAt] = useState<string | null>(null);
  const setAdviceEditPopUpOpen = useSetRecoilState(adviceEditPopUpOpenState);

  const handleCloseButtonClick = () => {
    setAdviceEditPopUpOpen(false);
  };

  useEffect(() => {
    // getAdviceInfo();
    requestCaseInfo();
  }, []);
  const requestAdviceInfo = () => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const data: DetailAdviceType = res.data;
      setAdviceInfo(res.data);

      setTitle(data.title);
      setContents(data.contents);
      setadvicedAt(data.advicedAt);
      const members = res.data.members;
      setSelectedMembers(members?.map((item: any) => item.id) ?? []);
      const clients = res.data.clients;
      setSelectedClients(clients?.map((item: any) => item.id) ?? []);
    };
    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };
    requestDeprecated("GET", `/advices/${adviceId}`, {
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  const requestCaseInfo = () => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: CaseInfoType = res.data;
      setCaseInfo(body);
      requestAdviceInfo();
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/lawsuits/${caseId}/basic`, {
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  const handleEditButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      setAdviceEditPopUpOpen(false);
    };
    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("PUT", `advices/${adviceId}`, {
      withToken: true,
      body: {
        lawsuitId: caseId,
        clientIdList: selectedClients,
        memberIdList: selectedMembers,
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

      {caseInfo && selectedMembers ? (
        <FormControl fullWidth>
          <InputLabel id="member">상담관</InputLabel>
          <Select
            labelId="member"
            label="상담관"
            multiple
            defaultValue={selectedMembers}
            onChange={(e) => {
              setSelectedMembers(e.target.value as number[]);
            }}
            value={selectedMembers} // 11
          >
            {/*<MenuItem key={11} value={11}>*/}
            {/*  하드코딩 데이터*/}
            {/*</MenuItem>*/}
            {caseInfo.employees.map((data) => (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}

      <FormControl fullWidth>
        <InputLabel id="client">상담자</InputLabel>
        <Select
          labelId="client"
          label="상담자"
          multiple
          value={selectedClients}
          onChange={(e) => {
            setSelectedClients(e.target.value as number[]);
          }}
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
        value={advicedAt?.split(" ")[0]}
        onChange={(e) => setadvicedAt(e.target.value)}
      />

      <Button variant="contained" size="large" onClick={handleEditButtonClick}>
        수정
      </Button>
    </PopUp>
  );
}

export default AdviceEditPopUp;
