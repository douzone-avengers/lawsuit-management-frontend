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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { delimiter, mapLawsuitStatus } from "../../../lib/convert.ts";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

function CaseBasicInfoCard() {
  const caseInfo = useRecoilValue(caseInfoState);

  return (
    <Card sx={{ width: "100%" }}>
      <CardTitle text="사건" />
      <List sx={{ display: "flex", padding: 0 }}>
        <ListProfileItem
          SvgIcon={WorkHistoryIcon}
          primary="사건 상태"
          secondary={mapLawsuitStatus(
            caseInfo?.lawsuit?.lawsuitStatus ?? "미정",
          )}
        />

        <ListProfileItem
          SvgIcon={FormatListNumberedIcon}
          primary="사건 번호"
          secondary={caseInfo?.lawsuit?.lawsuitNum ?? "미정"}
        />
        <ListProfileItem
          SvgIcon={TextFieldsIcon}
          primary="사건명"
          secondary={caseInfo?.lawsuit?.lawsuitName ?? "미정"}
        />
        <ListProfileItem
          SvgIcon={TagIcon}
          primary="사건 종류"
          secondary={caseInfo?.lawsuit?.lawsuitType ?? "미정"}
        />
        <ListProfileItem
          SvgIcon={BalanceIcon}
          primary="법원"
          secondary={caseInfo?.lawsuit?.courtName ?? "미정"}
        />
        <ListProfileItem
          SvgIcon={AttachMoneyIcon}
          primary="의뢰비"
          secondary={`${delimiter(
            caseInfo?.lawsuit.lawsuitCommissionFee ?? 0,
          )}원`}
        />
        <ListProfileItem
          SvgIcon={AttachMoneyIcon}
          primary="성공 보수 비용"
          secondary={`${delimiter(
            caseInfo?.lawsuit.lawsuitContingentFee ?? 0,
          )}원`}
        />
      </List>
    </Card>
  );
}

export default CaseBasicInfoCard;
