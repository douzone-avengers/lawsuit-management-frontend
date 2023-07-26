import { CaseReceptionRowType } from "../../states/case/CaseReceptionsState.tsx";
import CheckButton from "../common/CheckButton.tsx";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionEditConfirmButton({ item }: Props) {
  return (
    <CheckButton
      onClick={() => {
        console.log(item);
      }}
    />
  );
}

export default CaseReceptionEditConfirmButton;
