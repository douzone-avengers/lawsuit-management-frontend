import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

type Props = {
  SvgIcon: OverridableComponent<SvgIconTypeMap>;
  primary?: number | string;
  secondary?: number | string;
};

function ListProfileItem({ SvgIcon, primary, secondary }: Props) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <SvgIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}

export default ListProfileItem;
