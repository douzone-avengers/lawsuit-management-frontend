import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../../states/case/info/reception/CaseReceptionsState.tsx";
import caseReceptionSizeState from "../../../../../states/case/info/reception/CaseReceptionSizeState.tsx";
import { caseReceptionSearchUrlState } from "../../../../../states/case/info/reception/CaseReceptionSearchState.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionDeleteButton({ item }: Props) {
  const setReceptions = useSetRecoilState(caseReceptionsState);
  const setSize = useSetRecoilState(caseReceptionSizeState);
  const url = useRecoilValue(caseReceptionSearchUrlState);

  const handleClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        const {
          receptions,
          size,
        }: { receptions: CaseReceptionRowType[]; size: number } = res.data;
        setReceptions(
          receptions.map((item) => {
            return { ...item, editable: false };
          }),
        );
        setSize(size);
      };
      requestDeprecated("GET", url, {
        onSuccess: handleRequestSuccess2,
        useMock: false,
      });
    };
    requestDeprecated("PATCH", `/receptions/delete/${item.id}`, {
      onSuccess: handleRequestSuccess,
      useMock: false,
    });
  };
  return (
    <Button
      sx={{ marginLeft: 1, marginRight: 1 }}
      size="small"
      variant="outlined"
      fullWidth
      onClick={handleClick}
    >
      <DeleteIcon />
    </Button>
  );
}

export default CaseReceptionDeleteButton;
