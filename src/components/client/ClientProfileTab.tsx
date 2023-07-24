import Box from "@mui/material/Box";
import ClientInfoCard from "./ClientInfoCard.tsx";
import KakaoMap from "./ClientKakaoMap.tsx";
import { useRef, useState, useEffect } from "react";

function ClientProfileTab() {
  const parentContainer = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  useEffect(() => {
    function getParentSize() {
      if (parentContainer.current) {
        setParentWidth(parentContainer.current.offsetWidth);
        setParentHeight(parentContainer.current.offsetHeight);
      }
    }

    getParentSize();
    console.log("offsetWidth: " + parentWidth);
    console.log("offsetHeight: " + parentHeight);
    window.addEventListener("resize", getParentSize);

    return () => {
      window.removeEventListener("resize", getParentSize);
    };
  }, [
    parentContainer.current?.offsetWidth,
    parentContainer.current?.offsetHeight,
  ]);

  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: "row" }}>
      <ClientInfoCard width={480} height={140} />
      <Box
        ref={parentContainer}
        sx={{
          display: "inline-block",
          background: "red",
          flexGrow: 1,
          width: "100%",
          height: 140,
        }}
      >
        <KakaoMap parentWidth={parentWidth} parentHeight={parentHeight} />
      </Box>
    </Box>
  );
}

export default ClientProfileTab;
