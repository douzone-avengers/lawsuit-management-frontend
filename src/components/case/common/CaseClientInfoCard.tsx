import { useRecoilValue } from "recoil";
import caseInfoState from "../../../states/case/info/caseInfoState.tsx";
import Card from "@mui/material/Card";
import CardTitle from "../../common/CardTitle.tsx";
import List from "@mui/material/List";
import ListProfileItem from "../../common/ListProfileItem.tsx";
import PersonIcon from "@mui/icons-material/Person";

function CaseClientInfoCard() {
  const caseInfo = useRecoilValue(caseInfoState);

  return (
    <Card sx={{ width: "50%" }}>
      <CardTitle text="당사자" />
      <List
        className="custom-scroll"
        sx={{ display: "flex", padding: 0, overflowX: "scroll" }}
      >
        {caseInfo?.clients.map((item) => (
          <ListProfileItem
            key={item.id}
            SvgIcon={PersonIcon}
            primary={item.name}
            secondary={item.email}
          />
        ))}
      </List>
    </Card>
  );
}

export default CaseClientInfoCard;
