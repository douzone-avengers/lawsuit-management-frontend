import { useSetRecoilState } from "recoil";
import caseExpenseBillIdState from "../../../../../states/case/info/expense/CaseExpenseBillIdState.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import caseExpenseBillRemovePopUpOpenState from "../../../../../states/case/info/expense/CaseExpenseBillRemovePopUpOpenState.tsx";
import { CaseExpenseBillRowType } from "../../../../../states/case/info/expense/CaseExpenseBillState.tsx";

type Props = {
  item: CaseExpenseBillRowType & { editable: boolean };
};

function CaseExpenseBillRemoveButton({ item }: Props) {
  const setCaseExpenseBillId = useSetRecoilState(caseExpenseBillIdState);
  const setExpenseBillRemovePopUpOpen = useSetRecoilState(
    caseExpenseBillRemovePopUpOpenState,
  );

  const handleExpenseBillRemoveButtonClick = () => {
    setCaseExpenseBillId(item.id);
    setExpenseBillRemovePopUpOpen(true);
  };

  return (
    <Button
      sx={{ width: "100%" }}
      size="small"
      variant="contained"
      fullWidth
      onClick={handleExpenseBillRemoveButtonClick}
    >
      <DeleteIcon />
    </Button>
  );
}

export default CaseExpenseBillRemoveButton;
