import Box from "@mui/material/Box";
import { CaseExpenseRowType } from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import CaseExpenseContentsCell from "../cell/CaseExpenseContentsCell.tsx";
import CaseExpenseSpeningAtCell from "../cell/CaseExpenseSpeningAtCell.tsx";
import CaseExpenseAmountCell from "../cell/CaseExpenseAmountCell.tsx";
import CaseExpenseEditConfirmButton from "../button/CaseExpenseEditConfirmButton.tsx";
import CaseExpenseEditButton from "../button/CaseExpenseEditButton.tsx";
import CaseExpenseDeleteButton from "../button/CaseExpenseDeleteButton.tsx";
import { useSetRecoilState } from "recoil";
import caseExpenseIdState from "../../../../../states/case/info/expense/CaseExpenseIdState.tsx";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
  caseId: number | null;
};

function CaseExpenseDataRow({ item, caseId }: Props) {
  const setExpenseId = useSetRecoilState(caseExpenseIdState);
  const handleClickRow = () => {
    setExpenseId(item.id);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: 40,
      }}
    >
      <Box sx={{ width: 200, minWidth: 150 }}>
        <CaseExpenseSpeningAtCell item={item} handleClickRow={handleClickRow} />
      </Box>
      <Box sx={{ width: 500, minWidth: 200 }}>
        <CaseExpenseContentsCell item={item} handleClickRow={handleClickRow} />
      </Box>
      <Box sx={{ width: 200, minWidth: 100 }}>
        <CaseExpenseAmountCell item={item} handleClickRow={handleClickRow} />
      </Box>
      <Box sx={{ display: "flex", width: 150, minWidth: 150 }}>
        <Box
          sx={{
            width: "100%",
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
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CaseExpenseDeleteButton item={item} />
        </Box>
      </Box>
    </Box>
  );
}

export default CaseExpenseDataRow;
