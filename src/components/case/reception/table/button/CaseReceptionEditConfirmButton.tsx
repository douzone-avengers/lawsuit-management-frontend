import { useRecoilState } from "recoil";
import { produce } from "immer";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../../states/case/info/reception/CaseReceptionsState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import * as dayjs from "dayjs";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionEditConfirmButton({ item }: Props) {
  const [receptions, setReceptions] = useRecoilState(caseReceptionsState);

  const handleClick = () => {
    const handleSuccess: RequestSuccessHandler = (res) => {
      const body: {
        id: number;
        status: boolean;
        category: string;
        contents: string;
        receivedAt: string;
        deadline: string;
      } = res.data;
      const { status, category, contents, receivedAt, deadline } = body;
      const newReceptions = produce(receptions, (draft) => {
        const reception = draft.filter((item2) => item2.id === item.id)[0];
        reception.status = status;
        reception.category = category;
        reception.contents = contents;
        reception.receivedAt = receivedAt;
        reception.deadline = deadline;
        reception.editable = false;
      });
      setReceptions(newReceptions);
    };

    requestDeprecated("PUT", `/receptions/update/${item.id}`, {
      body: {
        status: item.status ? "complete" : "incomplete",
        category: item.category,
        contents: item.contents,
        receivedAt: dayjs(item.receivedAt).add(1, "day").toISOString(),
        deadline: dayjs(item.deadline).add(1, "day").toISOString(),
      },
      onSuccess: handleSuccess,
      useMock: false,
    });
  };
  return (
    <Button
      sx={{ marginLeft: 1, marginRight: 1 }}
      size="small"
      variant="contained"
      fullWidth
      onClick={handleClick}
    >
      <CheckIcon />
    </Button>
  );
}

export default CaseReceptionEditConfirmButton;
