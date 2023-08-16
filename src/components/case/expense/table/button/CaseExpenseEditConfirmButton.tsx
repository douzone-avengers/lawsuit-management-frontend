import { useRecoilState } from "recoil";
import CaseExpenseState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpenseState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import { produce } from "immer";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
};

function CaseExpenseEditConfirmButton({ item }: Props) {
  const [expense, setExpense] = useRecoilState(CaseExpenseState);

  const handleClick = () => {
    const handleSuccess: RequestSuccessHandler = (res) => {
      const body: {
        data: {
          id: number;
          speningAt: string;
          contents: string;
          amount: number;
        };
      } = res.data;

      const { speningAt, contents, amount } = body.data;
      const newExpense = produce(expense, (draft) => {
        const expense = draft.filter((item2) => item2.id === item.id)[0];
        expense.speningAt = speningAt;
        expense.contents = contents;
        expense.amount = amount;
        expense.editable = false;
      });
      setExpense(newExpense);
    };

    requestDeprecated("PUT", `/expense/update/${item.id}`, {
      body: {
        speningAt: item.speningAt,
        contents: item.contents,
        amount: item.amount,
      },
      onSuccess: handleSuccess,
    });
  };

  return (
    <Button
      sx={{ marginLeft: 1, marginRight: 1 }}
      size="small"
      variant="contained"
      onClick={handleClick}
    >
      <CheckIcon />
    </Button>
  );
}

export default CaseExpenseEditConfirmButton;
