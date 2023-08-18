import { useRecoilState } from "recoil";
import { produce } from "immer";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../../states/case/info/reception/CaseReceptionsState.tsx";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionEditButton({ item }: Props) {
  const [receptions, setReceptions] = useRecoilState(caseReceptionsState);

  const handleClick = () => {
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
      variant="contained"
      fullWidth
      onClick={handleClick}
    >
      <EditIcon />
    </Button>
  );
}

export default CaseReceptionEditButton;
