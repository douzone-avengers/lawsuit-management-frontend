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
import caseBookShareSelectPopUpOpenState from "../../../states/case/info/closing/CaseBookShareSelectPopUpOpenState.ts";
import { SelectChangeEvent } from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import { CaseInfoType } from "../../../states/case/info/caseInfoState.tsx";
import caseBookPDFUploadLoadingState from "../../../states/case/info/closing/CaseBookPDFUploadLoadingState.tsx";
import caseBookShareEmailsState from "../../../states/case/info/closing/CaseBookShareEmailsState.ts";

function CaseBookShareSelectPopUp() {
  const caseId = useRecoilValue(caseIdState);
  const [inputList, setInputList] = useState<string[]>([]);
  const [email, setEmail] = useRecoilState(caseBookShareEmailsState);
  const setUploadLoading = useSetRecoilState(caseBookPDFUploadLoadingState);

  const handleChange = (event: SelectChangeEvent<typeof email>) => {
    const {
      target: { value },
    } = event;
    setEmail(typeof value === "string" ? value.split(",") : value);
  };

  const setCaseBookShareSelectPopUpOpen = useSetRecoilState(
    caseBookShareSelectPopUpOpenState,
  );

  const handleCloseButtonClick = () => {
    setCaseBookShareSelectPopUpOpen(false);
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

export default CaseBookShareSelectPopUp;
