import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import validatedClientState from "../../states/join/ValidatedClientState";
import ClientJoinPage from "./ClientJoinPage";

function JoinPage() {
  const validatedClient = useRecoilValue(validatedClientState);

  return (
    <Box>
      validatedClient ? <ClientJoinPage /> : null
    </Box>
  );
}

export default JoinPage;
