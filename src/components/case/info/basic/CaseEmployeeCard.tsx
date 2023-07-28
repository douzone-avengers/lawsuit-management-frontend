import Card from "@mui/material/Card";
import CardTitle from "../common/CardTitle.tsx";
import List from "@mui/material/List";
import ListProfileItem from "../common/ListProfileItem.tsx";
import { useRecoilValue } from "recoil";
import caseInfoState from "../../../../states/case/info/caseInfoState.tsx";
import BadgeIcon from "@mui/icons-material/Badge";

function CaseEmployeeCard() {
  const caseInfo = useRecoilValue(caseInfoState);

  return (
    <Card>
      <CardTitle text="담당자" />
      <List sx={{ display: "flex", padding: 0 }}>
        {caseInfo?.employees.map((item) => (
          <ListProfileItem
            key={item.id}
            SvgIcon={BadgeIcon}
            primary={item.name}
            secondary={item.email}
          />
        ))}
      </List>
    </Card>
  );
}

export default CaseEmployeeCard;
