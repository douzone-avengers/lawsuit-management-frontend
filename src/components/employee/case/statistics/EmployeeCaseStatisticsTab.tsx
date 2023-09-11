import EmployeeCaseChart from "./EmployeeCaseChart";
import EmployeeCaseStatisticsInfoCard from "./EmployeeCaseStatisticsInfoCard";
import { useRecoilValue } from "recoil";
import employeeIdState from "../../../../states/employee/EmployeeIdState";
import { LawsuitCountStatus } from "../../type/LawsuitCountStatus";
import { useEffect, useState } from "react";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated";
import { Box } from "@mui/material";

// total: number;
// commissionFee: number;
// contingentFee: number;
// isLoading: boolean;
function EmployeeCaseStatisticsTab() {
  const employeeId = useRecoilValue(employeeIdState);
  const initialLawsuitCount: LawsuitCountStatus = {
    total: 0,
    registration: 0,
    proceeding: 0,
    closing: 0,
    isLoading: false,
  };
  const [lawsuitCountStatus, setLawsuitCountStatus] =
    useState(initialLawsuitCount);

  useEffect(() => {
    lawsuitStatusRequest();
  }, [employeeId]);

  const lawsuitStatusRequest = () => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const data = res.data;
      setLawsuitCountStatus({
        total: data.total,
        registration: data.registration,
        proceeding: data.proceeding,
        closing: data.closing,
        isLoading: true,
      });
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated(
      "GET",
      `/statistics/lawsuits-status/employees/${employeeId}`,
      {
        withToken: true,
        onSuccess: handleRequestSuccess,
        onFail: handleRequestFail,
      },
    );
  };

  return (
    <>
      <EmployeeCaseStatisticsInfoCard
        width={"100%"}
        name={"김더존"}
        winCnt={100}
        loseCnt={56}
        income={3000000}
      />
      <br />

      {lawsuitCountStatus.total === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          fontSize="24px"
        >
          담당 사건이 없습니다.
        </Box>
      ) : (
        <EmployeeCaseChart lawsuitCountStatus={lawsuitCountStatus} />
      )}
    </>
  );
}

export default EmployeeCaseStatisticsTab;
