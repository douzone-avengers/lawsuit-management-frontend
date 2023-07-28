import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../states/case/CaseReceptionsState.tsx";
import * as dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useRecoilState } from "recoil";
import { produce } from "immer";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionDeadlineCell({ item }: Props) {
  const [receptions, setReceptions] = useRecoilState(caseReceptionsState);

  const handleChange = (e: Dayjs | null) => {
    if (item.editable) {
      const newReceptions = produce(receptions, (draft) => {
        const reception = draft.filter((item2) => item2.id === item.id)[0];
        reception.deadline = e?.toDate().toISOString() ?? "";
      });
      setReceptions(newReceptions);
    }
  };

  return (
    <DatePicker
      key={item.id}
      disabled={!item.editable}
      format="YYYY-MM-DD"
      slotProps={{ textField: { size: "small" } }}
      defaultValue={dayjs(item.deadline)}
      onChange={handleChange}
    />
  );
}

export default CaseReceptionDeadlineCell;
