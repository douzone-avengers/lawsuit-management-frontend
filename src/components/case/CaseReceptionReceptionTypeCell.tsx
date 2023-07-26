import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { CaseReceptionRowType } from "../../states/case/CaseReceptionsState.tsx";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionReceptionTypeCell({ item }: Props) {
  return (
    <FormControl size="small" disabled={!item.editable}>
      <Select
        value={
          item.receptionType === "기일"
            ? "scheduled"
            : item.receptionType === "불변"
            ? "fixed"
            : ""
        }
      >
        <MenuItem value="scheduled">기일</MenuItem>
        <MenuItem value="fixed">불변</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CaseReceptionReceptionTypeCell;
