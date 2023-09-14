import EmployeeCaseChart from "./EmployeeCaseChart";
import { useRecoilValue } from "recoil";
import employeeIdState from "../../../../states/employee/EmployeeIdState";
import { LawsuitCountStatus } from "../../type/LawsuitCountStatus";
import { useEffect, useState } from "react";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated";
import { Box } from "@mui/material";
import { RevenueStatus } from "../../type/RevenueStatus";
import { MemberInfo } from "../../type/MemberInfo";
import EmployeeInfoCard from "../info/EmployeeInfoCard";

function EmployeeCaseStatisticsTab() {
  const employeeId = useRecoilValue(employeeIdState);
  const initialLawsuitCount: LawsuitCountStatus = {
    total: 0,
    registration: 0,
    proceeding: 0,
    closing: 0,
    isLoading: false,
  };
  const initialRevenue: RevenueStatus = {
    total: 0,
    localeTotal: "",
    commissionFee: 0,
    contingentFee: 0,
    isLoading: false,
  };

  const [lawsuitCountStatus, setLawsuitCountStatus] =
    useState(initialLawsuitCount);
  const [revenueStatus, setRevenueStatus] = useState(initialRevenue);
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();

  useEffect(() => {
    lawsuitStatusRequest();
    revenueStatusRequest();
    memberRequest();
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

  const revenueStatusRequest = () => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const data = res.data;
      setRevenueStatus({
        total: data.total,
        localeTotal: data.total.toLocaleString(),
        commissionFee: data.commissionFee,
        contingentFee: data.contingentFee,
        isLoading: true,
      });
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/statistics/revenues/employees/${employeeId}`, {
      withToken: true,
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  const memberRequest = () => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const memberInfo: MemberInfo = res.data;
      setMemberInfo(memberInfo);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/members/employees/${employeeId}`, {
      withToken: true,

      onSuccess: handleRequestSuccess,
      onFail: handelRequestFail,
    });
  };

  return (
    <>
      {memberInfo && setMemberInfo && (
        <EmployeeInfoCard
          width={"100%"}
          memberInfo={memberInfo}
          setMemberInfo={setMemberInfo}
          isEditable={false}
        />
      )}
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
        <EmployeeCaseChart
          lawsuitCountStatus={lawsuitCountStatus}
          revenueStatus={revenueStatus}
        />
      )}
    </>
  );
}

export default EmployeeCaseStatisticsTab;
