import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import adviceIdState from "../../../../../states/advice/AdviceIdState.tsx";
import adviceEditPopUpOpenState from "../../../../../states/advice/AdviceEditPopUpOpenState.tsx";

type Props = {
  curAdviceId: number;
  onClick?: (e: React.MouseEvent) => void;
};

function AdviceEditPopUpButton({ curAdviceId, onClick }: Props) {
  const setAdviceId = useSetRecoilState(adviceIdState);
  const setAdviceEditPopUpOpen = useSetRecoilState(adviceEditPopUpOpenState);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
    setAdviceId(curAdviceId);
    setAdviceEditPopUpOpen(true);
  };

  return (
    <Button variant={"outlined"} onClick={handleClick}>
      수정
    </Button>
  );
}

export default AdviceEditPopUpButton;
