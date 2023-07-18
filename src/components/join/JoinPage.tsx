import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../common/PopUp";
import Logo from "../layout/Logo";

function JoinPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hierarchy, setHierarchy] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setHierarchy(event.target.value as string);
  };
  const [isEmployeeJoin, setIsEmployeeJoin] = useState(true);
  const navigate = useNavigate();

  return (
    <PopUp>
      <Logo sx={{ width: "50%", marginBottom: 2 }} />
      <ButtonGroup variant="outlined" size="large" fullWidth>
        <Button
          variant={isEmployeeJoin ? "contained" : "outlined"}
          onClick={() => {
            setIsEmployeeJoin(true);
          }}
        >
          직원
        </Button>
        <Button
          variant={isEmployeeJoin ? "outlined" : "contained"}
          onClick={() => {
            setIsEmployeeJoin(false);
          }}
        >
          의뢰인
        </Button>
      </ButtonGroup>
      <TextField
        type="text"
        size="small"
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        type="email"
        size="small"
        label="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="tel"
        size="small"
        label="전화번호"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        type="text"
        size="small"
        label="주소"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {isEmployeeJoin ? (
        <Box>
          <FormControl fullWidth>
            <InputLabel id="hierarchy">직급</InputLabel>
            <Select
              labelId="hierarchy"
              label="직급"
              value={hierarchy}
              onChange={handleChange}
            >
              <MenuItem value={2}>사원</MenuItem>
              <MenuItem value={3}>대리</MenuItem>
              <MenuItem value={4}>과장</MenuItem>
              <MenuItem value={5}>부장</MenuItem>
              <MenuItem value={6}>변호사</MenuItem>
              <MenuItem value={7}>법무사</MenuItem>
              <MenuItem value={8}>사무장</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ) : null}
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          navigate("/login");
        }}
      >
        회원 가입
      </Button>
    </PopUp>
  );
}

export default JoinPage;
