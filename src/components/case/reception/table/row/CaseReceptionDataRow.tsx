import Box from "@mui/material/Box";
import CaseReceptionContentsCell from "../cell/CaseReceptionContentsCell.tsx";
import CaseReceptionReceivedAtCell from "../cell/CaseReceptionReceivedAtCell.tsx";
import CaseReceptionCategoryCell from "../cell/CaseReceptionCategoryCell.tsx";
import CaseReceptionStatusCell from "../cell/CaseReceptionStatusCell.tsx";
import CaseReceptionDeadlineCell from "../cell/CaseReceptionDeadlineCell.tsx";
import { CaseReceptionRowType } from "../../../../../states/case/info/reception/CaseReceptionsState.tsx";
import CaseReceptionEditConfirmButton from "../button/CaseReceptionEditConfirmButton.tsx";
import CaseReceptionEditButton from "../button/CaseReceptionEditButton.tsx";
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
      <Box sx={{ width: 20 }}></Box>
      <Box sx={{ width: 100 }}>
        <CaseReceptionStatusCell item={item} />
      </Box>
      <Box sx={{ width: 100 }}>
        <CaseReceptionCategoryCell item={item} />
      </Box>
      <Box
        sx={{
          width: "calc(100% - 720px)",
        }}
      >
        <CaseReceptionContentsCell item={item} />
      </Box>
      <Box sx={{ width: 150 }}>
        <CaseReceptionDeadlineCell item={item} />
      </Box>
      <Box sx={{ width: 150 }}>
        <CaseReceptionReceivedAtCell item={item} />
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
          <CaseReceptionEditConfirmButton item={item} />
        ) : (
          <CaseReceptionEditButton item={item} />
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
        <CaseReceptionDeleteButton item={item} />
      </Box>
    </Box>
  );
}

export default CaseReceptionDataRow;
