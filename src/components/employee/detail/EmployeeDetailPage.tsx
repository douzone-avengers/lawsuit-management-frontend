import { useRecoilValue } from "recoil";
import employeeIdState from "../../../states/employee/EmployeeIdState";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import EmployeeInfoCard from "./EmployeeInfoCard";
import useWindowSize from "../../../hook/useWindowSize";
import KakaoMap from "../../common/KaKaoMap";
import { MemberInfo } from "../type/MemberInfo.tsx";

function EmployeeDetailPage() {
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();
  const [width, height] = useWindowSize();
  const [boxWidth, setBoxWidth] = useState<number | undefined>(undefined);
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined);

  const employeeId = useRecoilValue(employeeIdState);
  const parentContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentContainer.current) {
      setBoxWidth(parentContainer.current.offsetWidth);
      setBoxHeight(parentContainer.current.offsetHeight);
    }
  }, [width, height]);

  useEffect(() => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: MemberInfo } = res.data;
      const { data } = body;
      setMemberInfo(data);
    };
    requestDeprecated("GET", `/members/${employeeId}`, {
      onSuccess: handleRequestSuccess,
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
