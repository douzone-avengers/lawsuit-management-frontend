import Box from "@mui/material/Box";
import { CaseExpenseRowType } from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import CaseExpenseContentsCell from "../cell/CaseExpenseContentsCell.tsx";
import CaseExpenseSpeningAtCell from "../cell/CaseExpenseSpeningAtCell.tsx";
import CaseExpenseAmountCell from "../cell/CaseExpenseAmountCell.tsx";
import CaseExpenseEditConfirmButton from "../button/CaseExpenseEditConfirmButton.tsx";
import CaseExpenseEditButton from "../button/CaseExpenseEditButton.tsx";
import CaseExpenseDeleteButton from "../button/CaseExpenseDeleteButton.tsx";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
  caseId: number | null;
};

function CaseExpenseDataRow({ item, caseId }: Props) {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ width: 200, flex: 1 }}>
        <CaseExpenseSpeningAtCell item={item} />
      </Box>
      <Box sx={{ width: 900 }}>
        <CaseExpenseContentsCell item={item} />
      </Box>
      <Box sx={{ width: 200 }}>
        <CaseExpenseAmountCell item={item} />
      </Box>
      <Box
        sx={{
          width: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {item.editable ? (
          <CaseExpenseEditConfirmButton item={item} caseId={caseId} />
        ) : (
          <CaseExpenseEditButton item={item} />
        )}
      </Box>
      <Box
        sx={{
          width: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CaseExpenseDeleteButton item={item} />
      </Box>
    </Box>
  );
}

export default CaseExpenseDataRow;
