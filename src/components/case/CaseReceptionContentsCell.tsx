import { CaseReceptionRowType } from "../../states/case/CaseReceptionsState.tsx";
import { TextField } from "@mui/material";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionContentsCell({ item }: Props) {
  return (
    <TextField disabled={!item.editable} size="small" value={item.contents} />
  );
}

export default CaseReceptionContentsCell;
