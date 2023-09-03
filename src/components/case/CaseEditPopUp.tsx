import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CloseButton from "../common/CloseButton.tsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PopUp from "../common/PopUp.tsx";
import { useRecoilState, useSetRecoilState } from "recoil";
import caseEditPopUpOpenState from "../../states/case/CaseEditPopUpOpenState.tsx";
import { useEffect, useState } from "react";
import { Court } from "./type/CourtInfo.ts";
import { MemberInfo } from "../employee/type/MemberInfo.tsx";
import { ClientInfo } from "../client/type/ClientInfo.ts";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import caseInfoState from "../../states/case/info/caseInfoState.tsx";
import { mapLawsuitStatus } from "../../lib/convert.ts";

type Props = {
  courtList: Court[];
};

function CaseEditPopUp({ courtList }: Props) {
  const [caseInfo, setCaseInfo] = useRecoilState(caseInfoState);
  const [lawsuitType, setLawsuitType] = useState<string>(
    caseInfo?.lawsuit.lawsuitType ?? "",
  );
  const [lawsuitName, setLawsuitName] = useState(
    caseInfo?.lawsuit?.lawsuitName ?? "",
  );
  const [selectCourtId, setSelectCourtId] = useState<number | null>(
    courtList.filter((it) => it.nameKr === caseInfo?.lawsuit.courtName)[0].id,
  );
  const [commissionFee, setCommissionFee] = useState<string>(
    caseInfo?.lawsuit?.lawsuitCommissionFee
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? "",
  );
  const [contingentFee, setContingentFee] = useState<string>(
    caseInfo?.lawsuit?.lawsuitContingentFee
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? "",
  );
  const [lawsuitStatus, _setLawsuitStatus] = useState<string>(
    caseInfo?.lawsuit?.lawsuitStatus ?? "",
  );
  const [lawsuitNum, setLawsuitNum] = useState(
    caseInfo?.lawsuit?.lawsuitNum ?? "",
  );
  const [memberList, setMemberList] = useState<MemberInfo[]>([]);
  const [selectMemberIdList, setSelectMemberIdList] = useState<number[]>(
    caseInfo?.employees?.map((item: any) => item.id) ?? [],
  );
  const [clientList, setClientList] = useState<ClientInfo[]>([]);
  const [selectClientIdList, setSelectClientIdList] = useState<number[]>(
    caseInfo?.clients?.map((item: any) => item.id) ?? [],
  );

  const [showWarnings, setShowWarnings] = useState<boolean>(false);
  const setCaseEditPopUpOpen = useSetRecoilState(caseEditPopUpOpenState);

  const handleCloseButtonClick = () => {
    setCaseEditPopUpOpen(false);
  };

  // 의뢰비 입력 시 구분자 추가
  const handleCommissionFeeChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3자리마다 쉼표 추가
    setCommissionFee(formattedValue);
  };

  // 성공보수비용 입력 시 구분자 추가
  const handleContingentFeeChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3자리마다 쉼표 추가
    setContingentFee(formattedValue);
  };

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
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, []);

  // 수정
  const handleCaseEditButtonClick = () => {
    if (
      !lawsuitType ||
      !(lawsuitName.length >= 3 && lawsuitName.length <= 50) ||
      !courtList.length ||
      !selectCourtId ||
      !(commissionFee.length >= 1 && commissionFee.length <= 20)
    ) {
      setShowWarnings(true);
      return;
    }
    setShowWarnings(false);

    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        setCaseInfo(res.data);
        setSelectMemberIdList(res.data.employees);
        setSelectClientIdList(res.data.clients);
        setCaseEditPopUpOpen(false);
      };

      const handleRequestFail2: RequestFailHandler = (e) => {
        alert((e.response.data as { code: string; message: string }).message);
      };

      requestDeprecated(
        "GET",
        `/lawsuits/${caseInfo!.lawsuit?.lawsuitId}/basic`,
        {
          onSuccess: handleRequestSuccess2,
          onFail: handleRequestFail2,
        },
      );
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("PUT", `/lawsuits/${caseInfo!.lawsuit?.lawsuitId}`, {
      body: {
        lawsuitType: lawsuitType,
        name: lawsuitName,
        courtId: selectCourtId,
        commissionFee: commissionFee.replace(/\D/g, ""),
        contingentFee: contingentFee.replace(/\D/g, ""),
        lawsuitStatus: mapLawsuitStatus(lawsuitStatus),
        lawsuitNum: lawsuitNum,
        memberId: selectMemberIdList,
        clientId: selectClientIdList,
      },
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
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
          사건 수정
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

      {(lawsuitName.length > 50 || lawsuitName.length < 3) && showWarnings ? (
        <TextField
          error
          id="outlined-error-helper-text"
          label="사건명 *"
          value={lawsuitName}
          inputProps={{
            minLength: 3,
            maxLength: 50,
          }}
          onChange={(e) => setLawsuitName(e.target.value)}
        />
      ) : (
        <TextField
          type="text"
          label="사건명 *"
          value={lawsuitName}
          inputProps={{
            minLength: 3,
            maxLength: 50,
          }}
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

      {(commissionFee.length < 1 || commissionFee.length > 26) &&
      showWarnings ? (
        <TextField
          error
          id="outlined-error-helper-text"
          label="의뢰비 *"
          value={commissionFee}
          inputProps={{
            minLength: 1,
            maxLength: 26,
          }}
          onChange={handleCommissionFeeChange}
        />
      ) : (
        <TextField
          type="text"
          label="의뢰비 *"
          value={commissionFee}
          inputProps={{
            minLength: 1,
            maxLength: 26,
          }}
          onChange={handleCommissionFeeChange}
        />
      )}

      <TextField
        type="text"
        label="성공보수비용"
        value={contingentFee}
        inputProps={{
          minLength: 1,
          maxLength: 26,
        }}
        onChange={handleContingentFeeChange}
      />

      <TextField
        type="text"
        label="사건번호"
        value={lawsuitNum}
        inputProps={{
          minLength: 2,
          maxLength: 20,
        }}
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
        onClick={handleCaseEditButtonClick}
      >
        수정
      </Button>
    </PopUp>
  );
}

export default CaseEditPopUp;
