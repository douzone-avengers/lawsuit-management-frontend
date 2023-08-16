import Card from "@mui/material/Card";
import List from "@mui/material/List";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TagIcon from "@mui/icons-material/Tag";
import BalanceIcon from "@mui/icons-material/Balance";
import { useRecoilValue } from "recoil";
import caseInfoState from "../../../states/case/info/caseInfoState.tsx";
import CardTitle from "../../common/CardTitle.tsx";
import ListProfileItem from "../../common/ListProfileItem.tsx";

function CaseBasicInfoCard() {
  const caseInfo = useRecoilValue(caseInfoState);

  return (
    <Card sx={{ width: "50%" }}>
      <CardTitle text="사건" />
      <List sx={{ display: "flex", padding: 0 }}>
        <ListProfileItem
          SvgIcon={FormatListNumberedIcon}
          primary="사건 번호"
          secondary={caseInfo?.lawsuit?.lawsuitNum}
        />
        <ListProfileItem
          SvgIcon={TextFieldsIcon}
          primary="사건명"
          secondary={caseInfo?.lawsuit?.name}
        />
        <ListProfileItem
          SvgIcon={TagIcon}
          primary="사건 종류"
          secondary={caseInfo?.lawsuit?.lawsuitType}
        />
        <ListProfileItem
          SvgIcon={BalanceIcon}
          primary="법원"
          secondary={caseInfo?.lawsuit?.courtId}
        />
      </List>
    </Card>
  );
}

export default CaseBasicInfoCard;
