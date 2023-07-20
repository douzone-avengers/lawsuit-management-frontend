import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { useNavigate } from "react-router-dom";

export type MainNavigationBarItemState = {
  id: number;
  text: string;
  url: string;
  SvgIcon?: OverridableComponent<SvgIconTypeMap>;
};

type Props = {
  selected: boolean;
  item: MainNavigationBarItemState;
};

function MainNavigationBarItem({
  selected,
  item: { SvgIcon, text, url },
}: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(url);
  };

  return (
    <ListItem disablePadding onClick={handleClick}>
      <ListItemButton selected={selected}>
        {SvgIcon ? (
          <ListItemIcon>
            <SvgIcon />
          </ListItemIcon>
        ) : null}
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

export default MainNavigationBarItem;
