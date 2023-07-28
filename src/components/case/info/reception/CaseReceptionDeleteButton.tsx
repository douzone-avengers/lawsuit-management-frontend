import DeleteButton from "../../../common/DeleteButton.tsx";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../states/case/CaseReceptionsState.tsx";
import request, { RequestSuccessHandler } from "../../../../lib/request.ts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { caseReceptionSearchUrlState } from "../../../../states/case/CaseReceptionSearchState.tsx";
import caseReceptionSizeState from "../../../../states/case/CaseReceptionSizeState.tsx";

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
        }: { receptions: CaseReceptionRowType[]; size: number } =
          res.data["data"];
        setReceptions(
          receptions.map((item) => {
            return { ...item, editable: false };
          }),
        );
        setSize(size);
      };
      console.log(url);
      request("GET", url, {
        onSuccess: handleRequestSuccess2,
      });
    };
    request("PUT", `/receptions/delete/${item.id}`, {
      onSuccess: handleRequestSuccess,
    });
  };
  return <DeleteButton onClick={handleClick} />;
}

export default CaseReceptionDeleteButton;
