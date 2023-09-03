import { useRecoilState } from "recoil";
import Card from "@mui/material/Card";
import CardTitle from "../common/CardTitle.tsx";
import List from "@mui/material/List";
import ListProfileItem from "../common/ListProfileItem.tsx";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated.ts";
import caseIdState from "../../../../states/case/CaseIdState.tsx";
import { AllLawsuitType } from "../../closing/print/PdfComponent.tsx";
import adviceIdState from "../../../../states/advice/AdviceState.tsx";

function AdviceClientInfoCard() {
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
      <CardTitle text="상담자" />
      <List sx={{ display: "flex", padding: 0 }}>
        <ListProfileItem
          SvgIcon={PersonIcon}
          primary={advice?.clientNames.join(", ")}
        />
      </List>
    </Card>
  );
}

export default AdviceClientInfoCard;
