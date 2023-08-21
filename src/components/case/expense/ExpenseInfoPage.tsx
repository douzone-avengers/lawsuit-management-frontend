import Box from "@mui/material/Box";
import CaseExpenseSearchBox from "./search/CaseExpenseSearchBox.tsx";
import CaseExpenseTable from "./table/CaseExpenseTable.tsx";
import Card from "@mui/material/Card";
import caseExpenseAddPopUpOpenState from "../../../states/case/info/expense/CaseExpenseAddPopUpOpenState.tsx";
import { useRecoilValue } from "recoil";
import CaseExpenseAddPopUp from "./table/popup/CaseExpenseAddPopUp.tsx";

function ExpenseInfoPage() {
  const expenseAddPopUpOpen = useRecoilValue(caseExpenseAddPopUpOpenState);

  return (
    <>
      <Card>
        <Box sx={{ marginTop: 2 }}>
          <CaseExpenseSearchBox />
          <CaseExpenseTable />
        </Box>
      </Card>
      {expenseAddPopUpOpen ? <CaseExpenseAddPopUp /> : null}
    </>
  );
}

export default ExpenseInfoPage;
