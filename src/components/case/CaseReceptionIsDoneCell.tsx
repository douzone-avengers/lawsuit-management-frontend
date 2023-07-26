import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { CaseReceptionRowType } from "../../states/case/CaseReceptionsState.tsx";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionIsDoneCell({ item }: Props) {
  return (
    <FormControl size="small" disabled={!item.editable}>
      <Select value={item.isDone ? "complete" : "incomplete"}>
        <MenuItem value="complete">완료</MenuItem>
        <MenuItem value="incomplete">미완료</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CaseReceptionIsDoneCell;
