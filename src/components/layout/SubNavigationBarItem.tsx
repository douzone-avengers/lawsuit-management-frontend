import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import subNavigationBarState from "../../states/layout/SubNavigationBarState";

export type SubNavigationBarItemState = {
  id: number;
  text: string;
  subText?: string;
  url: string;
  SvgIcon?: OverridableComponent<SvgIconTypeMap>;
};

type Props = {
  selected: boolean;
  item: SubNavigationBarItemState;
};

function SubNavigationBarItem({
  selected,
  item: { SvgIcon, text, subText, url, id },
}: Props) {
  const [subNavigationBar, setSubNavigationBar] = useRecoilState(
    subNavigationBarState,
  );

  const navigate = useNavigate();
  const handleClick = () => {
    setSubNavigationBar({
      ...subNavigationBar,
      curId: id,
    });
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
        <ListItemText primary={text} secondary={subText} />
      </ListItemButton>
    </ListItem>
  );
}

export default SubNavigationBarItem;
