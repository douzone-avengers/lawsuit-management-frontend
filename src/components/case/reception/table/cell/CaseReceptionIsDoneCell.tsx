import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import { Typography } from "@mui/material";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../../states/case/info/reception/CaseReceptionsState.tsx";

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

  return item.editable ? (
    <FormControl size="small" disabled={!item.editable} fullWidth>
      <Select
        value={item.isDone ? "complete" : "incomplete"}
        onChange={handleChange}
      >
        <MenuItem value="complete">완료</MenuItem>
        <MenuItem value="incomplete">미완료</MenuItem>
      </Select>
    </FormControl>
  ) : (
    <Typography
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
      }}
    >
      {item.isDone ? "완료" : "미완료"}
    </Typography>
  );
}

export default CaseReceptionIsDoneCell;
