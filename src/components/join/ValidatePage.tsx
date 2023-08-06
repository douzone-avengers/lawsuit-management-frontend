import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo.tsx";
import PopUp from "../common/PopUp";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import request, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/request";
import { ValidatedClientInfo } from "./type/ValidatedClientInfo";
import { useSetRecoilState } from "recoil";
import validatedClientState from "../../states/join/ValidatedClientState";

function JoinPage() {
  const [key, setKey] = useState("");
  const [userType, setUserType] = useState("employee");
  const navigate = useNavigate();

  const setValidatedClient = useSetRecoilState(validatedClientState);

  useEffect(() => {
    setValidatedClient(null);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setUserType(event.target.value as string);
  };
  const handelRequestSuccess: RequestSuccessHandler = (res) => {
    if (userType === "client") {
      const validatedClient: ValidatedClientInfo = {
        ...res.data,
        promotionKey: key,
      };
      setValidatedClient(validatedClient);
    }
    navigate("/join");
  };

  const handelRequestFail: RequestFailHandler = (e) => {
    alert(e?.name);
    // const body: { data: MemberInfo[] } = res.data;
    // const { data } = body;
  };
  const validateRequest = () => {
    if (userType === "employee") {
      request("GET", `/promotions/employees?key=${key}`, {
        withToken: false,
        useMock: false,
        onSuccess: handelRequestSuccess,
        onFail: handelRequestFail,
      });
    }

    if (userType === "client") {
      request("GET", `/promotions/clients?key=${key}`, {
        withToken: false,
        useMock: false,
        onSuccess: handelRequestSuccess,
        onFail: handelRequestFail,
      });
    }
  };

  return (
    <PopUp>
      <Logo sx={{ width: "50%", marginBottom: 2 }} />

      <TextField
        type="text"
        size="small"
        label="가입 키"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={userType}
        onChange={handleChange}
      >
        <FormControlLabel value="employee" control={<Radio />} label="직원" />
        <FormControlLabel value="client" control={<Radio />} label="의뢰인" />
      </RadioGroup>

      <Button variant="contained" size="large" onClick={validateRequest}>
        검증
      </Button>
    </PopUp>
  );
}

export default JoinPage;
