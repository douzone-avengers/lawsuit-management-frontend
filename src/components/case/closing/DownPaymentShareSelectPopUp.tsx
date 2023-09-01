import PopUp from "../../common/PopUp.tsx";
import CloseButton from "../../common/CloseButton.tsx";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { SelectChangeEvent } from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import { CaseInfoType } from "../../../states/case/info/caseInfoState.tsx";
import downPaymentShareEmailsState from "../../../states/case/info/closing/DownPaymentShareEmailsState.ts";
import downPaymentPDFUploadLoadingState from "../../../states/case/info/closing/DownPaymentPDFUploadLoadingState.tsx";
import downPaymentShareSelectPopUpOpenState from "../../../states/case/info/closing/DownPaymentShareSelectPopUpOpenState.ts";

function DownPaymentShareSelectPopUp() {
  const caseId = useRecoilValue(caseIdState);
  const [inputList, setInputList] = useState<string[]>([]);
  const [email, setEmail] = useRecoilState(downPaymentShareEmailsState);
  const setUploadLoading = useSetRecoilState(downPaymentPDFUploadLoadingState);

  const handleChange = (event: SelectChangeEvent<typeof email>) => {
    const {
      target: { value },
    } = event;
    setEmail(typeof value === "string" ? value.split(",") : value);
  };

  const setDownPaymentShareSelectPopUpOpen = useSetRecoilState(
    downPaymentShareSelectPopUpOpenState,
  );

  const handleCloseButtonClick = () => {
    setDownPaymentShareSelectPopUpOpen(false);
  };

  const handleShareButtonClick = () => {
    setUploadLoading("loading");
  };

  useEffect(() => {
    requestDeprecated("GET", `/lawsuits/${caseId}/basic`, {
      onSuccess: (res) => {
        const body: CaseInfoType = res.data;
        const clientEmails = body.clients.map((item) => item.email);
        setInputList(clientEmails);
      },
    });
  }, []);

  return (
    <PopUp>
      <CloseButton onClick={handleCloseButtonClick} />
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>이메일</InputLabel>
        <Select
          multiple
          value={email}
          onChange={handleChange}
          input={<OutlinedInput label="이메일" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
        >
          {inputList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={email.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button size="large" variant="contained" onClick={handleShareButtonClick}>
        공유
      </Button>
    </PopUp>
  );
}

export default DownPaymentShareSelectPopUp;
