import Box from "@mui/material/Box";
import ClientInfoCard from "./ClientInfoCard.tsx";
import { useEffect, useRef, useState } from "react";

function useWindowSize(): [number, number] {
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [windowSize.width, windowSize.height];
}

function ClientProfileTab() {
  const parentContainer = useRef<HTMLDivElement>(null);
  const [width, height] = useWindowSize();

  console.log(width, height);

  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: "row", height: "100%" }}>
      <ClientInfoCard width="50%" />
      <Box
        ref={parentContainer}
        sx={{
          display: "inline-block",
          background: "red",
          width: "50%",
          height: height - 210,
        }}
      >
        {/*<KakaoMap parentWidth={parentWidth} parentHeight={parentHeight} />*/}
      </Box>
    </Box>
  );
}

export default ClientProfileTab;
