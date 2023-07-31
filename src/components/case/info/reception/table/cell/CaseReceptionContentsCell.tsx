import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../../../states/case/info/reception/CaseReceptionsState.tsx";
import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { ChangeEvent } from "react";
import { produce } from "immer";
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
      }}
    >
      {item.contents}
    </Box>
  );
}

export default CaseReceptionContentsCell;
