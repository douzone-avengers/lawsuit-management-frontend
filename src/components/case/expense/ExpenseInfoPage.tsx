import Box from "@mui/material/Box";
import CaseExpenseSearchBox from "./search/CaseExpenseSearchBox.tsx";
import CaseExpenseTable from "./table/CaseExpenseTable.tsx";
import Card from "@mui/material/Card";
import caseExpenseAddPopUpOpenState from "../../../states/case/info/expense/CaseExpenseAddPopUpOpenState.tsx";
import { useRecoilValue } from "recoil";
import CaseExpenseAddPopUp from "./table/popup/CaseExpenseAddPopUp.tsx";
import CardTitle from "../../common/CardTitle.tsx";
import caseExpenseRemovePopUpOpenState from "../../../states/case/info/expense/CaseExpenseRemovePopUpOpenState.tsx";
import CaseExpenseRemovePopUp from "./table/popup/CaseExpenseRemovePopUp.tsx";
import CaseExpenseBillTable from "./table/CaseExpenseBillTable.tsx";
import { Divider } from "@mui/material";

function ExpenseInfoPage() {
  const expenseAddPopUpOpen = useRecoilValue(caseExpenseAddPopUpOpenState);
  const expenseRemovePopUpOpen = useRecoilValue(
    caseExpenseRemovePopUpOpenState,
  );

  return (
    <>
      <Card>
        <CardTitle text="지출" />
        <Box sx={{ marginTop: 2 }}>
          <CaseExpenseSearchBox />
        </Box>
      </Card>
      <Box sx={{ display: "flex" }}>
        <Divider
          sx={{ marginTop: "16px", marginBottom: "8px" }}
          orientation="vertical"
          flexItem
        />
        <CaseExpenseTable />
        <Divider
          sx={{ marginTop: "16px", marginRight: "5px", marginBottom: "8px" }}
          orientation="vertical"
          flexItem
        />
        <Divider
          sx={{ marginTop: "16px", marginBottom: "8px" }}
          orientation="vertical"
          flexItem
        />
        <CaseExpenseBillTable />
        <Divider
          sx={{ marginTop: "16px", marginBottom: "8px" }}
          orientation="vertical"
          flexItem
        />
      </Box>
      {expenseAddPopUpOpen ? <CaseExpenseAddPopUp /> : null}
      {expenseRemovePopUpOpen ? <CaseExpenseRemovePopUp /> : null}
    </>
  );
}

export default ExpenseInfoPage;
