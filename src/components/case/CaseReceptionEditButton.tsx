import EditButton from "../common/EditButton.tsx";
import { useRecoilState } from "recoil";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../states/case/CaseReceptionsState.tsx";
import { produce } from "immer";

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

  return <EditButton onClick={handleClick} />;
}

export default CaseReceptionEditButton;
