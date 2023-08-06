import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import validatedClientState from "../../states/join/ValidatedClientState";
import ClientJoinPage from "./ClientJoinPage";
import EmployeeJoinPage from "./EmployeeJoinPage";

function JoinPage() {
  const validatedClient = useRecoilValue(validatedClientState);

  return (
    <Box>{validatedClient ? <ClientJoinPage /> : <EmployeeJoinPage />}</Box>
  );
}

export default JoinPage;
