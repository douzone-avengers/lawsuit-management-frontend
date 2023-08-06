import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo.tsx";
import PopUp from "../common/PopUp";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

function JoinPage() {
  const handleChange = (event: SelectChangeEvent) => {
    setUserType(event.target.value as string);
  };

  const [key, setKey] = useState("");
  const [userType, setUserType] = useState("employee");
  const navigate = useNavigate();

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

      <Button
        variant="contained"
        size="large"
        onClick={() => {
          navigate("/join");
        }}
      >
        검증
      </Button>
    </PopUp>
  );
}

export default JoinPage;
