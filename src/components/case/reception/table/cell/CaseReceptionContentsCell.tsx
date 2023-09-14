import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { ChangeEvent } from "react";
import { produce } from "immer";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../../states/case/info/reception/CaseReceptionsState.tsx";
import Box from "@mui/material/Box";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionContentsCell({ item }: Props) {
  const [receptions, setReceptions] = useRecoilState(caseReceptionsState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (item.editable) {
      const newContents = e.target.value;
      const newReceptions = produce(receptions, (draft) => {
        const reception = draft.filter((item2) => item2.id === item.id)[0];
        reception.contents = newContents;
      });
      setReceptions(newReceptions);
    }
  };

  return item.editable ? (
    <TextField
      size="small"
      value={item.contents}
      onChange={handleChange}
      fullWidth
    />
  ) : (
    <Box
      sx={{
        marginTop: 1,
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "noWrap",
        textAlign: "center",
      }}
    >
      <span style={{ paddingTop: 2 }}>{item.contents}</span>
    </Box>
  );
}

export default CaseReceptionContentsCell;
