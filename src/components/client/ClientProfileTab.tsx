import Box from "@mui/material/Box";
import ClientInfoCard from "./ClientInfoCard.tsx";
import { useEffect, useRef, useState } from "react";
import KakaoMap from "./ClientKakaoMap.tsx";
import useWindowSize from "../../hook/useWindowSize.tsx";

function ClientProfileTab() {
  const parentContainer = useRef<HTMLDivElement>(null);
  const [width, height] = useWindowSize();
  const [boxWidth, setBoxWidth] = useState<number | undefined>(undefined);
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (parentContainer.current) {
      setBoxWidth(parentContainer.current.offsetWidth);
      setBoxHeight(parentContainer.current.offsetHeight);
    }
  }, [width, height]);

  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: "row", height: "100%" }}>
      <ClientInfoCard width="50%" />
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
        />
      </Box>
    </Box>
  );
}

export default ClientProfileTab;
