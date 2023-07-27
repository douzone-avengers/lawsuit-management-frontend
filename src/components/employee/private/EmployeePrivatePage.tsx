import EmployeePrivateCard from "./EmployeePrivateCard";
import Box from "@mui/material/Box";
import KakaoMap from "../../common/KaKaoMap";
import useWindowSize from "../../../hook/useWindowSize";
import { useEffect, useRef, useState } from "react";
import request, { RequestSuccessHandler } from "../../../lib/request";
import { MemberInfo } from "../../../mock/member/memberHandlers";
import { useRecoilValue } from "recoil";
import userState from "../../../states/common/UserState";

function EmployeePrivatePage() {
  const [width, height] = useWindowSize();
  const [boxWidth, setBoxWidth] = useState<number | undefined>(undefined);
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined);
  const parentContainer = useRef<HTMLDivElement>(null);

  const loginUser = useRecoilValue(userState);
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();

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
    request("GET", `/members/${loginUser?.id}`, {
      onSuccess: handleRequestSuccess,
    });
  }, [loginUser]);

  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: "row", height: "100%" }}>
      <EmployeePrivateCard width={"50%"} />

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

export default EmployeePrivatePage;
