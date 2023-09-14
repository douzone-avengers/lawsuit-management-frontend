import { useEffect, useState } from "react";
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
import { DetailAdviceType } from "../AdviceListTable.tsx";
import adviceInfoState from "../../../../../states/advice/adviceInfoState.tsx";

function AdviceEditPopUp() {
  /*const [advice, setAdvice] = useState<Advice | null>();*/
  const [_, setAdviceInfo] = useRecoilState(adviceInfoState);
  const caseInfo = useRecoilValue(caseInfoState);
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

  const [caseEmployees, setCaseEmployees] = useState(caseInfo?.employees);

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
      setAdviceInfo(res.data);

      setTitle(data.title);
      setContents(data.contents);
      setadvicedAt(data.advicedAt);
      const members = res.data.members;
      console.log("test");
      console.log(members);
      setSelectedMembers(members?.map((item: any) => item.id) ?? []);
      const clients = res.data.clients;
      setSelectedClients(clients?.map((item: any) => item.id) ?? []);
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

  const handleRequestSuccess: RequestSuccessHandler = () => {};
  requestDeprecated("GET", `/advices?lawsuit=${caseId}`, {
    withToken: true,
    onSuccess: handleRequestSuccess,
  });

  /*const handleMemberChange = (event: SelectChangeEvent<number[]>) => {
    const selectedIds = event.target.value as number[];
    const newMembers = produce(members, (draft) => {
      for (const member of draft) {
        if (selectedIds.includes(member.id)) {
          member.selected = true;
        } else {
          member.selected = false;
        }
      }
    });
    setMembers(newMembers);
  };

  // 상담자 선택 로직
  const handleClientChange = (event: SelectChangeEvent<number[]>) => {
    const selectedIds = event.target.value as number[];
    const newClients = produce(clients, (draft) => {
      for (const client of draft) {
        if (selectedIds.includes(client.id)) {
          client.selected = true;
        } else {
          client.selected = false;
        }
      }
    });
    setClients(newClients);
  };*/
  console.dir(selectedClients);
  console.dir(selectedMembers);
  const handleEditButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      setAdviceEditPopUpOpen(false);
    };
    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };
    // setClients([]);
    // setMembers([]);
    // setTitle("");
    // setContents("");
    // setadvicedAt("");
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
      {selectedMembers.length > 0 && caseEmployees ? (
        <FormControl fullWidth>
          <InputLabel id="member">상담관</InputLabel>
          <Select
            labelId="member"
            label="상담관"
            multiple
            value={selectedMembers}
            onChange={(e) => {
              setSelectedMembers(e.target.value as number[]);
            }}
          >
            {caseEmployees.map((data) => {
              console.dir(data);
              return (
                <MenuItem key={data.id} value={data.id}>
                  {data.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : null}

      <FormControl fullWidth>
        <InputLabel id="client">상담자</InputLabel>
        <Select
          labelId="client"
          label="상담자"
          multiple
          value={[14]}
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
