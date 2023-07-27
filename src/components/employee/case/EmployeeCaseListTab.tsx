import { useEffect, useState } from "react";
import request, { RequestSuccessHandler } from "../../../lib/request";
import { LawsuitData } from "../../../mock/lawsuit/lawsuitTable";
import { useRecoilValue } from "recoil";
import employeeIdState from "../../../states/employee/EmployeeIdState";
import Box from "@mui/material/Box";
import CaseListTable from "../../case/CaseListTable";

function EmployeeCaseListTab() {
  const employeeId = useRecoilValue(employeeIdState);
  const [cases, setCases] = useState<LawsuitData[]>([]);

  useEffect(() => {
    console.log(employeeId);

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: LawsuitData[] } = res.data;
      const { data } = body;
      setCases(data);

      console.log(cases);
    };

    request("GET", `/lawsuits/members/${employeeId}`, {
      onSuccess: handleRequestSuccess,
    });
  }, [employeeId]);

  return (
    <Box>
      <CaseListTable
        cases={cases.map((item) => ({
          ...item,
          // 클릭했을 때 어디로 가느냐 하는 문제..
          onClick: () => {
            // navigate(`/cases/${item.id}?client=`);
          },
        }))}
      />
    </Box>
  );
}

export default EmployeeCaseListTab;
