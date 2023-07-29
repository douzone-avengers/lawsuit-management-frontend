import { CaseReceptionRowType } from "../../../../../../states/case/info/reception/CaseReceptionsState.tsx";
import Box from "@mui/material/Box";
import CaseReceptionContentsCell from "../cell/CaseReceptionContentsCell.tsx";
import CaseReceptionReceivedAtCell from "../cell/CaseReceptionReceivedAtCell.tsx";
import CaseReceptionTypeCell from "../cell/CaseReceptionTypeCell.tsx";
import CaseReceptionIsDoneCell from "../cell/CaseReceptionIsDoneCell.tsx";
import CaseReceptionEditButton from "../button/CaseReceptionEditButton.tsx";
import CaseReceptionEditConfirmButton from "../button/CaseReceptionEditConfirmButton.tsx";
import CaseReceptionDeadlineCell from "../cell/CaseReceptionDeadlineCell.tsx";
import CaseReceptionDeleteButton from "../button/CaseReceptionDeleteButton.tsx";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionDataRow({ item }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box sx={{ width: "15%" }}>
        <CaseReceptionIsDoneCell item={item} />
      </Box>
      <Box sx={{ width: "15%" }}>
        <CaseReceptionTypeCell item={item} />
      </Box>
      <Box sx={{ width: "15%" }}>
        <CaseReceptionContentsCell item={item} />
      </Box>
      <Box sx={{ width: "15%" }}>
        <CaseReceptionReceivedAtCell item={item} />
      </Box>
      <Box sx={{ width: "15%" }}>
        <CaseReceptionDeadlineCell item={item} />
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
          <CaseReceptionEditConfirmButton item={item} />
        ) : (
          <CaseReceptionEditButton item={item} />
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
        <CaseReceptionDeleteButton item={item} />
      </Box>
    </Box>
  );
}

export default CaseReceptionDataRow;
