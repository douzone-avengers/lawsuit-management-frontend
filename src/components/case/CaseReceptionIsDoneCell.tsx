import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../states/case/CaseReceptionsState.tsx";
import { useRecoilState } from "recoil";
import { produce } from "immer";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionIsDoneCell({ item }: Props) {
  const [receptions, setReceptions] = useRecoilState(caseReceptionsState);

  const handleChange = (e: SelectChangeEvent) => {
    if (item.editable) {
      const newIsDone = e.target.value;
      const newReceptions = produce(receptions, (draft) => {
        const reception = draft.filter((item2) => item2.id === item.id)[0];
        reception.isDone = newIsDone === "complete";
      });
      setReceptions(newReceptions);
    }
  };

  return (
    <FormControl size="small" disabled={!item.editable}>
      <Select
        value={item.isDone ? "complete" : "incomplete"}
        onChange={handleChange}
      >
        <MenuItem value="complete">완료</MenuItem>
        <MenuItem value="incomplete">미완료</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CaseReceptionIsDoneCell;
