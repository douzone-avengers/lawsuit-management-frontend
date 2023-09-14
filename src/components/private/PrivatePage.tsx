import Box from "@mui/material/Box";
import KakaoMap from "../common/KaKaoMap";
import useWindowSize from "../../hook/useWindowSize";
import { useEffect, useRef, useState } from "react";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import { MemberInfo } from "../employee/type/MemberInfo";
import PrivateCard from "./PrivateCard";
import { useRecoilValue } from "recoil";
import curMemberAddressState from "../../states/employee/CurMemberAddressState";

function PrivatePage() {
  const [width, height] = useWindowSize();
  const [boxWidth, setBoxWidth] = useState<number | undefined>(undefined);
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined);
  const parentContainer = useRef<HTMLDivElement>(null);

  const [memberInfo, setMemberInfo] = useState<MemberInfo>();
  const recoilAddress = useRecoilValue(curMemberAddressState);

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

    requestDeprecated("GET", `/members/me`, {
      withToken: true,

      onSuccess: handleRequestSuccess,
      onFail: handelRequestFail,
    });
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: "row", height: "100%" }}>
      {memberInfo && setMemberInfo && (
        <PrivateCard
          width={"50%"}
          memberInfo={memberInfo}
          setMemberInfo={setMemberInfo}
        />
      )}

      <Box
        ref={parentContainer}
        sx={{
          display: "inline-block",
          width: "50%",
          height: height - 105,
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

export default PrivatePage;
