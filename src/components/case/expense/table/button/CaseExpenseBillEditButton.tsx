import { useRecoilState } from "recoil";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { produce } from "immer";
import caseExpenseBillState, {
  CaseExpenseBillRowType,
} from "../../../../../states/case/info/expense/CaseExpenseBillState.tsx";

type Props = {
  item: CaseExpenseBillRowType & { editable: boolean };
};
function CaseExpenseBillEditButton({ item }: Props) {
  const [expenseBill, setExpenseBill] = useRecoilState(caseExpenseBillState);

  const handleClick = () => {
    const newExpenseBill = produce(expenseBill, (draft) => {
      const expenseBill = draft.filter((item2) => item2.id === item.id)[0];
      expenseBill.editable = true;
    });

    setExpenseBill(newExpenseBill);
  };
  return (
    <Button
      sx={{ width: "100%", marginRight: 1 }}
      size="small"
      variant="contained"
      fullWidth
      onClick={handleClick}
    >
      <EditIcon />
    </Button>
  );
}

export default CaseExpenseBillEditButton;
