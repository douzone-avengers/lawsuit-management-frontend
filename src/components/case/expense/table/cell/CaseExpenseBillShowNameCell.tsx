import Box from "@mui/material/Box";
import { CaseExpenseBillRowType } from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillState.tsx";

type Props = {
  item: CaseExpenseBillRowType & { editable: boolean };
};

function CaseExpenseBillShowNameCell({ item }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
      }}
    >
      {item.showFileName + "." + item.extension}
    </Box>
  );
}

export default CaseExpenseBillShowNameCell;
