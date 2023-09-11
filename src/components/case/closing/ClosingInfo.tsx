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

function ClosingInfo() {
  const isEmployee = useRecoilValue(isEmployeeState);
  const [caseInfo, setCaseInfo] = useRecoilState(caseInfoState);
  const [judgement, setJudgement] = useState<string | undefined>();
  const [hasError, setHasError] = useState(false);

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
          </Card>
        </>
      ) : isEmployee ? (
        <div
          style={{
            display: "flex",
            gap: 10,
            height: "100%",
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
                width: 300,
              }}
              error={hasError}
            >
              <MenuItem value="판결승">판결승</MenuItem>
              <MenuItem value="판결패">판결패</MenuItem>
            </Select>
          </FormControl>
          <Button
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
            확인
          </Button>
        </div>
      ) : (
        <div
          style={{
            marginLeft: 15,
            color: "gray",
          }}
        >
          종결되지 않은 사건입니다.
        </div>
      )}
    </Box>
  );
}

export default ClosingInfo;
