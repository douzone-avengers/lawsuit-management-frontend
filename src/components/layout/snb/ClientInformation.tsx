import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListItemText from "@mui/material/ListItemText";
import { useRecoilState } from "recoil";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import { useEffect, useState } from "react";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import { ClientData } from "../../../mock/client/clientTable.ts";

function ClientInformation() {
  const clientId = useRecoilState(clientIdState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const {
        data: { name, email, phone },
      }: { data: ClientData } = res.data;
      setName(name);
      setEmail(email);
      setPhone(phone);
    };

    request("GET", `/clients/${clientId}`, {
      onSuccess: handleRequestSuccess,
    });
  }, [clientId]);

  return (
    <List sx={{ height: "100%", padding: 0 }}>
      <ListItem sx={{ height: "100%", padding: 0 }}>
        <ListItemAvatar>
          <Avatar>
            <AccountBoxIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${name} (${phone})`} secondary={`${email}`} />
      </ListItem>
    </List>
  );
}

export default ClientInformation;
