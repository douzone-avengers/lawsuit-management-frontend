import AdviceMemberInfoCard from "./member/AdviceMemberInfoCard.tsx";
import AdviceClientInfoCard from "./client/AdviceClientInfoCard.tsx";
import { AllLawsuitType } from "../closing/print/PdfComponent.tsx";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import adviceIdState from "../../../states/advice/AdviceState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import CardTitle from "./common/CardTitle.tsx";
import List from "@mui/material/List";
import ListProfileItem from "./common/ListProfileItem.tsx";
import Card from "@mui/material/Card";

/*
type Props = {
  advices: Advicedata[];
  client: ClientData | null;
};
{ advices, client }: Props*/
/*
type Props = {
  advice?: AllLawsuitType;
};*/
function AdviceInfoCard(/*{ advice }: Props*/) {
  const [data, setData] = useState<AllLawsuitType | null>(null);
  const [adviceId] = useRecoilState(adviceIdState);
  const [caseId] = useRecoilState(caseIdState);
  /* const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [date, setDate] = useState("");*/
  /*useEffect(() => {
    if (advice?.advices[0].title) {
      setTitle(advice?.advices[0].title);
    }
    if (advice?.advices[1].contents) {
      setContents(advice?.advices[1].contents);
    }
    if (advice?.advices[2].date) {
      setDate(advice?.advices[2].date);
    }
  });*/

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

  // const updateRequest = () => {
  //   const handleRequestSuccess: RequestSuccessHandler = () => {
  //     alert("정보가 수정되었습니다");
  //   };
  //   requestDeprecated("PUT", `/advices/${adviceId}`, {
  //     withToken: true,
  //     onSuccess: handelRequestSuccess,
  //     body: {
  //       title,
  //       contents,
  //       date,
  //     },
  //   });
  // };

  const advice = data?.advices.filter((item) => item.id === adviceId)[0];

  return (
    <div>
      <Card sx={{ width: "50%" }}>
        <CardTitle text={advice?.title as string} />
        <List sx={{ display: "initial", padding: 0 }}>
          <ListProfileItem primary={advice?.contents} />
        </List>
        <List sx={{ display: "flex", padding: 0 }}>
          <ListProfileItem primary={advice?.date} />
        </List>
      </Card>
      <div>
        <AdviceClientInfoCard />
      </div>
      <div>
        <AdviceMemberInfoCard />
      </div>
    </div>
  );
}

export default AdviceInfoCard;
