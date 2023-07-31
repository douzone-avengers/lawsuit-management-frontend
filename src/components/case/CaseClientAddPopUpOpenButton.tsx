import { useSetRecoilState } from "recoil";
import caseClientAddPopUpOpenState from "../../states/case/CaseClientAddPopUpOpenState.tsx";
import PlusButton from "../common/PlusButton.tsx";

function CaseClientAddPopUpOpenButton() {
  const setCaseClientAddPopUpOpen = useSetRecoilState(
    caseClientAddPopUpOpenState,
  );
  const handleClick = () => {
    setCaseClientAddPopUpOpen(true);
  };
  return <PlusButton onClick={handleClick} />;
}

export default CaseClientAddPopUpOpenButton;
