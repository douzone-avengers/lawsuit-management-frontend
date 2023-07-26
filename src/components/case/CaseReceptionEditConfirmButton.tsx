import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../states/case/CaseReceptionsState.tsx";
import { useRecoilState } from "recoil";
import CheckButton from "../common/CheckButton.tsx";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import { produce } from "immer";

type Props = {
  item: CaseReceptionRowType & { editable: boolean };
};

function CaseReceptionEditConfirmButton({ item }: Props) {
  const [receptions, setReceptions] = useRecoilState(caseReceptionsState);

  const handleClick = () => {
    const handleSuccess: RequestSuccessHandler = (res) => {
      const body: {
        data: {
          id: number;
          isDone: boolean;
          receptionType: string;
          contents: string;
          receivedAt: string;
          deadline: string;
        };
      } = res.data;
      const { isDone, receptionType, contents, receivedAt, deadline } =
        body.data;
      const newReceptions = produce(receptions, (draft) => {
        const reception = draft.filter((item2) => item2.id === item.id)[0];
        reception.isDone = isDone;
        reception.receptionType = receptionType;
        reception.contents = contents;
        reception.receivedAt = receivedAt;
        reception.deadline = deadline;
        reception.editable = false;
      });
      setReceptions(newReceptions);
    };

    request("PUT", `/receptions/update/${item.id}`, {
      body: {
        isDone: item.isDone,
        receptionType: item.receptionType,
        contents: item.contents,
        receivedAt: item.receivedAt,
        deadline: item.deadline,
      },
      onSuccess: handleSuccess,
    });
  };

  return <CheckButton onClick={handleClick} />;
}

export default CaseReceptionEditConfirmButton;
