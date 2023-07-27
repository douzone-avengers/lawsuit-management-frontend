import { useEffect, useState } from "react";
import request, { RequestSuccessHandler } from "../../../lib/request";
import { MemberInfo } from "../../../mock/member/memberHandlers";
import { Box } from "@mui/material";
import EmployeeListTable from "./EmployeeListTable";
import { useNavigate } from "react-router-dom";

function EmployeeListPage() {
  const navigate = useNavigate();

  const [memberInfos, setMemberInfos] = useState<MemberInfo[]>([]);

  useEffect(() => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: MemberInfo[] } = res.data;
      const { data } = body;
      setMemberInfos(data);
    };

    request("GET", `/members?role=EMPLOYEE,ADMIN`, {
      onSuccess: handleRequestSuccess,
    });
    console.log(memberInfos);
  }, []);

  return (
    <Box>
      <EmployeeListTable
        memberInfos={memberInfos.map((item) => ({
          ...item,
          onClick: () => {
            navigate(`/employees/${item.id}`);
          },
        }))}
      />
    </Box>
  );
}

export default EmployeeListPage;
