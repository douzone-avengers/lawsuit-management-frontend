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
        total: data.total ?? 0,
        registration: data.registration ?? 0,
        proceeding: data.proceeding ?? 0,
        closing: data.closing ?? 0,
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
        total: data.total ?? 0,
        localeTotal: data.total ? data.total.toLocaleString() : 0,
        commissionFee: data.commissionFee ?? 0,
        contingentFee: data.contingentFee ?? 0,
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

      <EmployeeCaseChart
        lawsuitCountStatus={lawsuitCountStatus}
        revenueStatus={revenueStatus}
      />
    </>
  );
}

export default EmployeeCaseStatisticsTab;
