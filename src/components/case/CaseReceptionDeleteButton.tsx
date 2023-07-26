import DeleteButton from "../common/DeleteButton.tsx";
import { CaseReceptionRowType } from "../../states/case/CaseReceptionsState.tsx";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionDeleteButton({ item }: Props) {
  // TODO:
  return (
    <DeleteButton
      onClick={() => {
        console.log(item);
      }}
    />
  );
}

export default CaseReceptionDeleteButton;
