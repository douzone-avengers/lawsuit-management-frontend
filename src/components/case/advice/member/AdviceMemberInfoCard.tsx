import Card from "@mui/material/Card";
import CardTitle from "../common/CardTitle.tsx";
import List from "@mui/material/List";
import ListProfileItem from "../common/ListProfileItem.tsx";
import { useRecoilState } from "recoil";
import adviceIdState from "../../../../states/advice/AdviceState.tsx";
import caseIdState from "../../../../states/case/CaseIdState.tsx";
import { useEffect, useState } from "react";
import { AllLawsuitType } from "../../closing/print/PrintComponent.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated.ts";
import PersonIcon from "@mui/icons-material/Person";

function AdviceMemberInfoCard() {
  const [adviceId] = useRecoilState(adviceIdState);
  const [caseId] = useRecoilState(caseIdState);
  const [data, setData] = useState<AllLawsuitType | null>(null);

  useEffect(() => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: AllLawsuitType = res.data;
      console.log(adviceId);
      setData(body);
    };
    requestDeprecated("GET", `/lawsuits/${caseId}/print`, {
      withToken: true,
      onSuccess: handleRequestSuccess,
    });
  }, []);
  const advice = data?.advices.filter((item) => item.id === adviceId)[0];
  return (
    <Card sx={{ width: "50%" }}>
      <CardTitle text="상담관" />
      <List sx={{ display: "flex", padding: 0 }}>
        <ListProfileItem
          SvgIcon={PersonIcon}
          primary={advice?.memberNames.join(", ")}
        />
      </List>
    </Card>
  );
}

export default AdviceMemberInfoCard;
