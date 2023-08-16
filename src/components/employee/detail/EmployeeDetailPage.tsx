import Box from "@mui/material/Box";
import KakaoMap from "../../common/KaKaoMap";
import useWindowSize from "../../../hook/useWindowSize";
import { useEffect, useRef, useState } from "react";
import request, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../lib/request";
import { MemberInfo } from "../type/MemberInfo";
import { useRecoilValue } from "recoil";
import curMemberAddressState from "../../../states/employee/CurMemberAddressState";
import EmployeeInfoCard from "./EmployeeInfoCard";
import employeeIdState from "../../../states/employee/EmployeeIdState";

function EmployeeDetailPage() {
  const [width, height] = useWindowSize();
  const [boxWidth, setBoxWidth] = useState<number | undefined>(undefined);
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined);
  const parentContainer = useRef<HTMLDivElement>(null);

  const [memberInfo, setMemberInfo] = useState<MemberInfo>();
  const recoilAddress = useRecoilValue(curMemberAddressState);
  const employeeId = useRecoilValue(employeeIdState);

  useEffect(() => {
    if (parentContainer.current) {
      setBoxWidth(parentContainer.current.offsetWidth);
      setBoxHeight(parentContainer.current.offsetHeight);
    }
  }, [width, height]);

  useEffect(() => {
    if (recoilAddress !== undefined) {
      setMemberInfo((prev) => {
        if (!prev) return; // 혹은 기본 값을 반환

        return {
          ...prev,
          address: recoilAddress,
        };
      });
    }
  }, [recoilAddress]);

  useEffect(() => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const memberInfo: MemberInfo = res.data;
      setMemberInfo(memberInfo);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    request("GET", `/members/employees/${employeeId}`, {
      withToken: true,
      useMock: false,
      onSuccess: handleRequestSuccess,
      onFail: handelRequestFail,
    });
  }, [employeeId]);

  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: "row", height: "100%" }}>
      <EmployeeInfoCard width={"50%"} memberInfo={memberInfo} />

      <Box
        ref={parentContainer}
        sx={{
          display: "inline-block",
          width: "50%",
          height: height - 210,
        }}
      >
        <KakaoMap
          parentWidth={boxWidth || 0}
          parentHeight={boxHeight ? boxHeight : 0}
          address={memberInfo?.address}
        />
      </Box>
    </Box>
  );
}

export default EmployeeDetailPage;
