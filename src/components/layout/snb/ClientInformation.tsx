import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListItemText from "@mui/material/ListItemText";
import { useRecoilValue } from "recoil";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import { useEffect, useState } from "react";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import { ClientData } from "../../../mock/client/clientTable.ts";

function ClientInformation() {
  const clientId = useRecoilValue(clientIdState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!clientId) {
      return;
    }
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const clientData: ClientData = res.data;
      setName(clientData.name);
      setEmail(clientData.email);
      setPhone(clientData.phone);
    };

    request("GET", `/clients/${clientId}`, {
      useMock: false,
      withToken: true,
      onSuccess: handleRequestSuccess,
    });
  }, [clientId]);

  const contents =
    clientId !== null ? (
      <>
        <ListItemAvatar>
          <Avatar>
            <AccountBoxIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${name} (${phone})`} secondary={`${email}`} />
      </>
    ) : null;

  return (
    <List sx={{ height: "100%", padding: 0 }}>
      <ListItem sx={{ height: "100%", padding: 0 }}>{contents}</ListItem>
    </List>
  );
}

export default ClientInformation;
