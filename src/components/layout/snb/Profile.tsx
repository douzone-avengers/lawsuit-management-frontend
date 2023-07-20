import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { fromHierarchy } from "../../../lib/convert.ts";
import userState from "../../../states/common/UserState.tsx";

export default function Profile() {
  const user = useRecoilValue(userState);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <List sx={{ height: "100%", padding: 0 }}>
      <ListItem sx={{ height: "100%", padding: 0 }}>
        <ListItemAvatar>
          <Avatar>
            <AccountBoxIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${user.name} (${fromHierarchy(user.hierarchy)})`}
          secondary={user.email}
        />
      </ListItem>
    </List>
  );
}
