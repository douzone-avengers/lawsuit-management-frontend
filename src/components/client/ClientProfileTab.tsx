import Box from "@mui/material/Box";
import ClientInfoCard from "./ClientInfoCard.tsx";
import { useRef } from "react";
import KakaoMap from "./ClientKakaoMap.tsx";
import useWindowSize from "../../hook/useWindowSize.tsx";

function ClientProfileTab() {
  const parentContainer = useRef<HTMLDivElement>(null);
  const [width, height] = useWindowSize();

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
        <KakaoMap parentWidth={width / 2} parentHeight={height - 210} />
      </Box>
    </Box>
  );
}

export default ClientProfileTab;
