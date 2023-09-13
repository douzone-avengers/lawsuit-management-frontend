import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import adviceIdState from "../../../../../states/advice/AdviceIdState.tsx";
import adviceEditPopUpOpenState from "../../../../../states/advice/adviceEditPopUpOpenState.tsx";

type Props = {
  curAdviceId: number;
};

function AdviceEditPopUpButton({ curAdviceId }: Props) {
  const setAdviceId = useSetRecoilState(adviceIdState);
  const setAdviceEditPopUpOpen = useSetRecoilState(adviceEditPopUpOpenState);

  const handleClick = () => {
    setAdviceId(curAdviceId);
    setAdviceEditPopUpOpen(true);
  };

  return (
    <Button size="large" variant="contained" onClick={handleClick}>
      수정
    </Button>
  );
}

export default AdviceEditPopUpButton;
