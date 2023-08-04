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

function CaseReceptionTypeCell({ item }: Props) {
  const [receptions, setReceptions] = useRecoilState(caseReceptionsState);

  const handleChange = (e: SelectChangeEvent) => {
    if (item.editable) {
      const { value } = e.target;
      const newReceptionType =
        value === "scheduled" ? "기일" : value === "fixed" ? "불변" : "";
      const newReceptions = produce(receptions, (draft) => {
        const reception = draft.filter((item2) => item2.id === item.id)[0];
        reception.receptionType = newReceptionType;
      });
      setReceptions(newReceptions);
    }
  };

  return item.editable ? (
    <FormControl size="small" disabled={!item.editable} fullWidth>
      <Select
        value={
          item.receptionType === "기일"
            ? "scheduled"
            : item.receptionType === "불변"
            ? "fixed"
            : ""
        }
        onChange={handleChange}
      >
        <MenuItem value="scheduled">기일</MenuItem>
        <MenuItem value="fixed">불변</MenuItem>
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
      {item.receptionType}
    </Typography>
  );
}

export default CaseReceptionTypeCell;
