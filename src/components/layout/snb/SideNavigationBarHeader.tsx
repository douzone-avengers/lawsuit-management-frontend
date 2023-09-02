import Box from "@mui/material/Box";
import SideNavigationBarHiddenButton from "./SideNavigationBarHiddenButton.tsx";
import ClientInformation from "./ClientInformation.tsx";

function SideNavigationBarHeader() {
  return (
    <Box
      sx={{
        transitionProperty: "width",
        transition: "all 0.5s",
        height: 64,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid lightgray",
      }}
    >
      <ClientInformation />
      <SideNavigationBarHiddenButton />
    </Box>
  );
}

export default SideNavigationBarHeader;
