import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../states/case/CaseReceptionsState.tsx";
import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { ChangeEvent } from "react";
import { produce } from "immer";

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

  return (
    <TextField
      disabled={!item.editable}
      size="small"
      value={item.contents}
      onChange={handleChange}
    />
  );
}

export default CaseReceptionContentsCell;
