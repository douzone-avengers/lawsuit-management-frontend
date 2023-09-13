import Box from "@mui/material/Box";
import CaseBookShareButton from "./CaseBookShareButton.tsx";
import CaseBookPrintButton from "./CaseBookPrintButton.tsx";
import Card from "@mui/material/Card";
import DownPaymentShareButton from "./DownPaymentShareButton.tsx";
import DownPaymentPrintButton from "./DownPaymentPrintButton.tsx";
import caseInfoState from "../../../states/case/info/caseInfoState.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import { isEmployeeState } from "../../../states/user/UserState.ts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Button from "@mui/material/Button";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import GavelIcon from "@mui/icons-material/Gavel";
import TextField from "@mui/material/TextField";
import downPaymentAccountState from "../../../states/case/info/closing/DownPaymentAccountState.ts";
import downPaymentBankState from "../../../states/case/info/closing/DownPaymentBankState.ts";

function ClosingInfo() {
  const isEmployee = useRecoilValue(isEmployeeState);
  const [caseInfo, setCaseInfo] = useRecoilState(caseInfoState);
  const [judgement, setJudgement] = useState<string | undefined>();
  const [hasError, setHasError] = useState(false);
  const [account, setAccount] = useRecoilState(downPaymentAccountState);
  const [bank, setBank] = useRecoilState(downPaymentBankState);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {caseInfo?.lawsuit.lawsuitStatus === "CLOSING" ? (
        <>
          <Card>
            <Box
              sx={{
                margin: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>사건집</Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CaseBookPrintButton />
                <CaseBookShareButton />
              </Box>
            </Box>
          </Card>
        </>
      ) : isEmployee ? (
        <Card>
          <Box
            sx={{
              margin: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>판결</Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FormControl size="small">
                <InputLabel>판결</InputLabel>
                <Select
                  label="판결"
                  onChange={(e: SelectChangeEvent) => {
                    setHasError(false);
                    setJudgement(e.target.value);
                  }}
                  value={judgement}
                  sx={{
                    width: 100,
                  }}
                  error={hasError}
                >
                  <MenuItem value="원고승">원고승</MenuItem>
                  <MenuItem value="원고패">원고패</MenuItem>
                </Select>
              </FormControl>
              <Button
                sx={{ display: "flex", gap: 1 }}
                variant="contained"
                onClick={() => {
                  if (!judgement) {
                    setHasError(true);
                    return;
                  }
                  requestDeprecated("PATCH", "/lawsuits/closing", {
                    body: {
                      lawsuitId: caseInfo?.lawsuit.lawsuitId,
                      result: judgement,
                    },
                    onSuccess: (res) => {
                      const body = res.data;
                      setCaseInfo(body);
                    },
                  });
                }}
              >
                <Box
                  sx={{
                    fontSize: 18,
                  }}
                >
                  확인
                </Box>
                <GavelIcon />
              </Button>
            </Box>
          </Box>
        </Card>
      ) : null}
      {isEmployee ? (
        <Card>
          <Box
            sx={{
              margin: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>청구서</Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DownPaymentPrintButton />
              <DownPaymentShareButton />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              padding: 1,
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{
                width: 100,
              }}
              label="은행"
              onChange={(e) => setBank(e.target.value)}
              value={bank}
            />
            <TextField
              sx={{
                flexGrow: 1,
              }}
              label="계좌번호"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          </Box>
        </Card>
      ) : null}
      {caseInfo?.lawsuit.lawsuitStatus !== "CLOSING" && (
        <div style={{ marginLeft: 15, color: "gray" }}>
          종결되지 않은 사건입니다.
        </div>
      )}
    </Box>
  );
}

export default ClosingInfo;
