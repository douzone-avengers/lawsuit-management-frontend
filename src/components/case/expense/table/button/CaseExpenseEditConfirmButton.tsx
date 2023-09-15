import { useRecoilState } from "recoil";
import CaseExpenseState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import { produce } from "immer";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import * as dayjs from "dayjs";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
  caseId: number | null;
};

function CaseExpenseEditConfirmButton({ item, caseId }: Props) {
  const [expenses, setExpenses] = useRecoilState(CaseExpenseState);

  const handleClick = () => {
    const handleSuccess: RequestSuccessHandler = (res) => {
      const body: {
        id: number;
        speningAt: string;
        contents: string;
        amount: number;
      } = res.data;

      const { speningAt, contents, amount } = body;
      const newExpenses = produce(expenses, (draft) => {
        const expenses = draft.filter((item2) => item2.id === item.id)[0];
        expenses.speningAt = speningAt;
        expenses.contents = contents;
        expenses.amount = amount;
        expenses.editable = false;
      });
      setExpenses(newExpenses);
    };

    requestDeprecated("PUT", `/expenses/update/${item.id}`, {
      body: {
        lawsuitId: caseId,
        speningAt: dayjs(item.speningAt).add(1, "day").toISOString(),
        contents: item.contents,
        amount: item.amount,
      },
      onSuccess: handleSuccess,
    });
  };

  return (
    <Button
      sx={{ width: "100%", marginRight: 1 }}
      size="small"
      variant="outlined"
      fullWidth
      onClick={handleClick}
    >
      <CheckIcon />
    </Button>
  );
}

export default CaseExpenseEditConfirmButton;
