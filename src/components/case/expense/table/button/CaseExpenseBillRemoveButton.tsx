import { useSetRecoilState } from "recoil";
import CloseIcon from "@mui/icons-material/Close";
import caseExpenseBillRemovePopUpOpenState from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillRemovePopUpOpenState.tsx";
import { CaseExpenseBillRowType } from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillState.tsx";
import caseExpenseBillIdState from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillIdState.tsx";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

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
    <Box
      sx={{ width: "100%", textAlign: "center" }}
      onClick={handleExpenseBillRemoveButtonClick}
    >
      <IconButton
        sx={{ size: "small" }}
        onClick={handleExpenseBillRemoveButtonClick}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default CaseExpenseBillRemoveButton;
