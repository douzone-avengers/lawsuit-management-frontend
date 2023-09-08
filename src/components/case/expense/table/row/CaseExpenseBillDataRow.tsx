import { CaseExpenseBIllRowType } from "../../../../../states/case/info/expense/CaseExpenseBIllRowType.tsx";
import Box from "@mui/material/Box";
import CaseExpenseBillShowNameCell from "../cell/CaseExpenseBillShowNameCell.tsx";
import CaseExpenseBillEditConfirmButton from "../button/CaseExpenseBillEditConfirmButton.tsx";
import CaseExpenseBillEditButton from "../button/CaseExpenseBillEditButton.tsx";
import CaseExpenseBillDeleteButton from "../button/CaseExpenseBillDeleteButton.tsx";

type Props = {
  item: CaseExpenseBIllRowType & { editable: boolean };
  expenseBillId: number | null;
};
function CaseExpenseBillDataRow({ item, expenseBillId }: Props) {
  return (
    <Box sx={{ display: "flex", width: "100%", height: 40 }}>
      <Box>
        <CaseExpenseBillShowNameCell item={item} />
      </Box>
      <Box sx={{ display: "flex", width: 150, minWidth: 150 }}>
        <Box>
          {item.editable ? (
            <CaseExpenseBillEditConfirmButton
              item={item}
              expenseBillId={expenseBillId}
            />
          ) : (
            <CaseExpenseBillEditButton item={item} />
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
          <CaseExpenseBillDeleteButton item={item} />
        </Box>
      </Box>
    </Box>
  );
}

export default CaseExpenseBillDataRow;
