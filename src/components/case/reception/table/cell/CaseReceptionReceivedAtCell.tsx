import * as dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import Box from "@mui/material/Box";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../../states/case/info/reception/CaseReceptionsState.tsx";
import { toDateValue } from "../../../../../lib/convert.ts";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionReceivedAtCell({ item }: Props) {
  const [receptions, setReceptions] = useRecoilState(caseReceptionsState);

  const handleChange = (e: Dayjs | null) => {
    if (item.editable) {
      const newReceptions = produce(receptions, (draft) => {
        const reception = draft.filter((item2) => item2.id === item.id)[0];
        reception.receivedAt = e?.toDate().toISOString() ?? "";
      });
      setReceptions(newReceptions);
    }
  };

  return item.editable ? (
    <DatePicker
      key={item.id}
      disabled={!item.editable}
      format="YYYY-MM-DD"
      slotProps={{ textField: { size: "small" } }}
      defaultValue={dayjs(item.receivedAt)}
      onChange={handleChange}
      sx={{ width: "100%" }}
    />
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
      }}
    >
      {toDateValue(item.receivedAt)}
    </Box>
  );
}

export default CaseReceptionReceivedAtCell;
