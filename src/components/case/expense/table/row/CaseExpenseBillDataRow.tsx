import Box from "@mui/material/Box";
import CaseExpenseBillShowNameCell from "../cell/CaseExpenseBillShowNameCell.tsx";
import CaseExpenseBillRemoveButton from "../button/CaseExpenseBillRemoveButton.tsx";
import { CaseExpenseBillRowType } from "../../../../../states/case/info/expense/CaseExpenseBillState.tsx";

type Props = {
  item: CaseExpenseBillRowType & { editable: boolean };
};

function CaseExpenseBillDataRow({ item }: Props) {
  return (
    <Box sx={{ display: "flex", width: "100%", height: 40 }}>
      <Box
        sx={{
          width: 300,
          minWidth: 150,
        }}
      >
        <CaseExpenseBillShowNameCell item={item} />
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
          <CaseExpenseBillRemoveButton item={item} />
        </Box>
      </Box>
    </Box>
  );
}

export default CaseExpenseBillDataRow;
