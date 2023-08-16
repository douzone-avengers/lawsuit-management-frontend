import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import employeeButtonIdState from "../../states/employee/EmployeeButtonIdState";

function CaseLayout() {
  const employeeButtonId = useRecoilValue(employeeButtonIdState);
  // const loginUser = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <ButtonGroup variant="outlined" size="large" fullWidth>
        <Button
          variant={employeeButtonId === 0 ? "contained" : "outlined"}
          onClick={() => {
            navigate(`/employees/private`);
          }}
        >
          개인정보
        </Button>
        <Button
          variant={employeeButtonId === 1 ? "contained" : "outlined"}
          onClick={() => {
            navigate(`/employees/list`);
          }}
        >
          사원 리스트
        </Button>
        <Button
          variant={employeeButtonId === 2 ? "contained" : "outlined"}
          onClick={() => {
            // navigate(`/employees/${loginUser?.id}`); //사원 상세 탭 이동 시 기본값 자기자신
          }}
        >
          사원 상세
        </Button>
        <Button
          variant={employeeButtonId === 3 ? "contained" : "outlined"}
          onClick={() => {
            // navigate(`/employees/${loginUser?.id}/cases`); //사건정보 탭 이동 시 기본값 자기자신
          }}
        >
          사건 정보
        </Button>
      </ButtonGroup>
      <Outlet />
    </Box>
  );
}

export default CaseLayout;
