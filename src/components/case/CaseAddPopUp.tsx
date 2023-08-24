import PopUp from "../common/PopUp.tsx";
import CloseButton from "../common/CloseButton.tsx";
import caseAddPopUpOpenState from "../../states/case/CaseAddPopUpOpenState.tsx";
import { useSetRecoilState } from "recoil";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import { Court } from "./type/CourtInfo.ts";
import { MemberInfo } from "../employee/type/MemberInfo.tsx";
import { ClientInfo } from "../client/type/ClientInfo.ts";
import { LawsuitInfo } from "./type/LawsuitInfo.tsx";
import { mapLawsuitStatus } from "../../lib/convert.ts";

type Props = {
  clientId: number | null;
  setCases: React.Dispatch<React.SetStateAction<LawsuitInfo[]>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  rowsPerPage: number;
  searchWord: string | null;
};
function CaseAddPopUp({
  clientId,
  setCases,
  setCount,
  page,
  rowsPerPage,
  searchWord,
}: Props) {
  const [lawsuitType, setLawsuitType] = useState<string | null>("");
  const [lawsuitName, setLawsuitName] = useState("");
  const [courtList, setCourtList] = useState<Court[]>([]);
  const [selectCourtId, setSelectCourtId] = useState<number | null>(null);
  const [commissionFee, setCommissionFee] = useState<string>("");
  const [contingentFee, setContingentFee] = useState<string>("");
  const [lawsuitNum, setLawsuitNum] = useState("");
  const [memberList, setMemberList] = useState<MemberInfo[]>([]);
  const [selectMemberIdList, setSelectMemberIdList] = useState<number[]>([]);
  const [clientList, setClientList] = useState<ClientInfo[]>([]);
  const [selectClientIdList, setSelectClientIdList] = useState<number[]>([]);

  const setCaseAddPopUpOpen = useSetRecoilState(caseAddPopUpOpenState);
  const [showWarnings, setShowWarnings] = useState<boolean>(false);

  // 법원 리스트
  useEffect(() => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const courtData = res.data;
      setCourtList(courtData);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/court`, {
      useMock: false,
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, []);

  // 현재 로그인한 유저 배열에 default로 추가
  useEffect(() => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const data: number = res.data.id;
      setSelectMemberIdList([data, ...selectMemberIdList]);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/members/me`, {
      withToken: true,
      useMock: false,
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, []);

  // 현재 의뢰인 정보 배열에 default로 추가
  useEffect(() => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const data: number = res.data.id;
      setSelectClientIdList([data, ...selectClientIdList]);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/clients/${clientId}`, {
      withToken: true,
      useMock: false,
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, []);

  // 멤버 리스트
  useEffect(() => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      setMemberList(res.data.memberDtoNonPassList);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/members/employees`, {
      withToken: true,
      useMock: false,
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, []);

  // 의뢰인 리스트
  useEffect(() => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      setClientList(res.data);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/clients`, {
      useMock: false,
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, []);

  // 등록
  const handleCaseAddButtonClick = () => {
    if (
      !lawsuitType ||
      !lawsuitName ||
      !courtList.length ||
      !selectCourtId ||
      !commissionFee
    ) {
      setShowWarnings(true);
      return;
    }
    setShowWarnings(false);

    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        const lawsuitData: {
          lawsuitList: LawsuitInfo[];
          count: number;
        } = res.data;

        const mappedLawsuitList = lawsuitData.lawsuitList.map((item) => ({
          ...item,
          lawsuitStatus: mapLawsuitStatus(item.lawsuitStatus),
        }));

        setCases(mappedLawsuitList);
        setCount(lawsuitData.count);
      };

      requestDeprecated("GET", `/lawsuits/clients/${clientId}`, {
        onSuccess: handleRequestSuccess2,
        useMock: false,
        params: {
          curPage: (page + 1).toString(),
          rowsPerPage: rowsPerPage.toString(),
          searchWord: searchWord || "",
        },
      });

      setCaseAddPopUpOpen(false);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("POST", `/lawsuits`, {
      body: {
        lawsuitType: lawsuitType,
        name: lawsuitName,
        courtId: selectCourtId,
        commissionFee: commissionFee.replace(/\D/g, ""),
        contingentFee: contingentFee.replace(/\D/g, ""),
        lawsuitNum: lawsuitNum,
        memberId: selectMemberIdList,
        clientId: selectClientIdList,
      },
      useMock: false,
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  const handleCloseButtonClick = () => {
    setCaseAddPopUpOpen(false);
  };

  // 의뢰비 입력 시 구분자 추가
  const handleCommissionFeeChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3자리마다 쉼표 추가
    setCommissionFee(formattedValue);
  };

  // 의뢰비 입력 시 구분자 추가
  const handleContingentFeeChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3자리마다 쉼표 추가
    setContingentFee(formattedValue);
  };

  return (
    <PopUp width={600} height={763.27}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", flex: 1, marginLeft: "30px" }}
        >
          사건 등록
        </Typography>
        <CloseButton onClick={handleCloseButtonClick} />
      </Box>

      {showWarnings && !lawsuitType ? (
        <FormControl fullWidth error>
          <InputLabel id="demo-simple-select-error-label">
            사건종류 *
          </InputLabel>
          <Select
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error-label"
            label="사건종류 *"
            value={lawsuitType}
            onChange={(e) => setLawsuitType(e.target.value as string)}
          >
            <MenuItem value={"형사"}>형사</MenuItem>
            <MenuItem value={"민사"}>민사</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-required">사건종류</InputLabel>
          <Select
            labelId="demo-simple-select-required"
            label="사건종류"
            value={lawsuitType}
            onChange={(e) => setLawsuitType(e.target.value as string)}
          >
            <MenuItem value={"형사"}>형사</MenuItem>
            <MenuItem value={"민사"}>민사</MenuItem>
          </Select>
        </FormControl>
      )}

      {showWarnings && !lawsuitName ? (
        <TextField
          error
          id="outlined-error-helper-text"
          label="사건명 *"
          value={lawsuitName}
          onChange={(e) => setLawsuitName(e.target.value)}
        />
      ) : (
        <TextField
          type="text"
          label="사건명 *"
          value={lawsuitName}
          onChange={(e) => setLawsuitName(e.target.value)}
        />
      )}

      {showWarnings && !selectCourtId ? (
        <FormControl fullWidth error>
          <InputLabel id="demo-simple-select-error-label">법원 *</InputLabel>
          <Select
            labelId="demo-simple-select-error-label"
            label="법원"
            onChange={(e) => {
              setSelectCourtId(
                courtList.filter((it) => it.id === e.target.value)[0].id,
              );
            }}
            value={selectCourtId}
          >
            {courtList.map((court) => (
              <MenuItem key={court.id} value={court.id}>
                {court.nameKr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-required">법원</InputLabel>
          <Select
            labelId="court"
            label="법원"
            onChange={(e) => {
              setSelectCourtId(
                courtList.filter((it) => it.id === e.target.value)[0].id,
              );
            }}
            value={selectCourtId}
          >
            {courtList.map((court) => (
              <MenuItem key={court.id || 0} value={court.id || 0}>
                {court.nameKr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {showWarnings && !commissionFee ? (
        <TextField
          error
          id="outlined-error-helper-text"
          label="의뢰비 *"
          value={commissionFee}
          onChange={handleCommissionFeeChange}
        />
      ) : (
        <TextField
          type="text"
          label="의뢰비 *"
          value={commissionFee}
          onChange={handleCommissionFeeChange}
        />
      )}

      <TextField
        type="text"
        label="성공보수비용"
        value={contingentFee}
        onChange={handleContingentFeeChange}
      />

      <TextField
        type="text"
        label="사건번호"
        value={lawsuitNum}
        onChange={(e) => setLawsuitNum(e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel id="member">담당자</InputLabel>
        <Select
          labelId="member"
          label="담당자"
          multiple
          onChange={(e) => {
            setSelectMemberIdList(e.target.value as number[]);
          }}
          value={selectMemberIdList}
        >
          {memberList.map((member) => (
            <MenuItem key={member.id} value={member.id}>
              {member.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="client">의뢰인</InputLabel>
        <Select
          labelId="client"
          label="의뢰인"
          multiple
          onChange={(e) => {
            setSelectClientIdList(e.target.value as number[]);
          }}
          value={selectClientIdList}
        >
          {clientList.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        onClick={handleCaseAddButtonClick}
      >
        등록
      </Button>
    </PopUp>
  );
}

export default CaseAddPopUp;
