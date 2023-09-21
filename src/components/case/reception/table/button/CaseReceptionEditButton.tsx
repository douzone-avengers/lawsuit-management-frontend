import { useRecoilState, useSetRecoilState } from "recoil";
import { produce } from "immer";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../../states/case/info/reception/CaseReceptionsState.tsx";
import caseReceptionPreviousState from "../../../../../states/case/info/reception/CaseReceptionPreviousState.tsx";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionEditButton({ item }: Props) {
  const [receptions, setReceptions] = useRecoilState(caseReceptionsState);
  const setPreviousData = useSetRecoilState(caseReceptionPreviousState);

  const handleClick = () => {
    setPreviousData(receptions);

    const newReceptions = produce(receptions, (draft) => {
      const reception = draft.filter((item2) => item2.id === item.id)[0];
      reception.editable = true;
    });
    setReceptions(newReceptions);
  };

  return (
    <Button
      sx={{ marginLeft: 1, marginRight: 1 }}
      size="small"
      variant="outlined"
      fullWidth
      onClick={handleClick}
    >
      <EditIcon />
    </Button>
  );
}

export default CaseReceptionEditButton;
