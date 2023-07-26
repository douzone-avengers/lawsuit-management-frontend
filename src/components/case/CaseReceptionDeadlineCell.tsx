import { CaseReceptionRowType } from "../../states/case/CaseReceptionsState.tsx";
import * as dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionDeadlineCell({ item }: Props) {
  return (
    <DatePicker
      key={item.id}
      disabled={!item.editable}
      format="YYYY-MM-DD"
      slotProps={{ textField: { size: "small" } }}
      defaultValue={dayjs(item.receivedAt)}
    />
  );
}

export default CaseReceptionDeadlineCell;
