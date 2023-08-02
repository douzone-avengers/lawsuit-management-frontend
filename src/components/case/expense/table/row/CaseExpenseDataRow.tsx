import Box from "@mui/material/Box";
import { CaseExpenseRowType } from "../../../../../states/case/info/expense/CaseExpenseState.tsx";
import CaseExpenseContentsCell from "../cell/CaseExpenseContentsCell.tsx";
import CaseExpenseSpeningAtCell from "../cell/CaseExpenseSpeningAtCell.tsx";
import CaseExpenseAmountCell from "../cell/CaseExpenseAmountCell.tsx";
import CaseExpenseEditConfirmButton from "../button/CaseExpenseEditConfirmButton.tsx";
import CaseExpenseEditButton from "../button/CaseExpenseEditButton.tsx";
import CaseExpenseDeleteButton from "../button/CaseExpenseDeleteButton.tsx";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
};

function CaseExpenseDataRow({ item }: Props) {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ width: "25%" }}>
        <CaseExpenseSpeningAtCell item={item} />
      </Box>
      <Box sx={{ width: "25%" }}>
        <CaseExpenseContentsCell item={item} />
      </Box>
      <Box sx={{ width: "25%" }}>
        <CaseExpenseAmountCell item={item} />
      </Box>
      <Box
        sx={{
          width: "12.5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {item.editable ? (
          <CaseExpenseEditConfirmButton item={item} />
        ) : (
          <CaseExpenseEditButton item={item} />
        )}
      </Box>
      <Box
        sx={{
          width: "12.5%",
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
