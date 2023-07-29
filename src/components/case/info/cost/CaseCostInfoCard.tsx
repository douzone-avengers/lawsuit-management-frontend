import Card from "@mui/material/Card";
import CardTitle from "../common/CardTitle.tsx";
import List from "@mui/material/List";
import ListProfileItem from "../common/ListProfileItem.tsx";
import { useRecoilValue } from "recoil";
import caseInfoState from "../../../../states/case/info/caseInfoState.tsx";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { delimiter } from "../../../../lib/convert.ts";

function CaseCostInfoCard() {
  const caseInfo = useRecoilValue(caseInfoState);

  if (caseInfo)
    return (
      <Card sx={{ width: "50%" }}>
        <CardTitle text="비용" />
        <List sx={{ display: "flex", padding: 0 }}>
          <ListProfileItem
            SvgIcon={AttachMoneyIcon}
            primary={"의뢰비"}
            secondary={`${delimiter(caseInfo?.lawsuit.commissionFee ?? 0)}원`}
          />
          <ListProfileItem
            SvgIcon={AttachMoneyIcon}
            primary={"성공 보수 비용"}
            secondary={`${delimiter(caseInfo?.lawsuit.contingentFee ?? 0)}원`}
          />
        </List>
      </Card>
    );
}

export default CaseCostInfoCard;
