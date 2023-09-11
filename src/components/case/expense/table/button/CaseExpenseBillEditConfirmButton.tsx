import { useRecoilState } from "recoil";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import { produce } from "immer";
import caseExpenseBillState, {
  CaseExpenseBillRowType,
} from "../../../../../states/case/info/expense/CaseExpenseBillState.tsx";

type Props = {
  item: CaseExpenseBillRowType & { editable: boolean };
  expenseBillId: number | null;
};
function CaseExpenseBillEditConfirmButton({ item, expenseBillId }: Props) {
  const [expenseBill, setExpenseBill] = useRecoilState(caseExpenseBillState);

  const handleClick = () => {
    const handleSuccess: RequestSuccessHandler = (res) => {
      const body: {
        expenseBillId: number;
        showFileName: string;
        originFileName: string;
        path: string;
        extension: string;
      } = res.data;

      const { showFileName, originFileName, path, extension } = body;
      const newExpenseBill = produce(expenseBill, (draft) => {
        const expenseBill = draft.filter((item2) => item2.id === item.id)[0];

        expenseBill.showFileName = showFileName;
        expenseBill.originFileName = originFileName;
        expenseBill.path = path;
        expenseBill.extension = extension;
      });

      setExpenseBill(newExpenseBill);
    };

    requestDeprecated("PUT", `/files/update/${item.id}`, {
      body: {
        expenseBillId: expenseBillId,
        showFilename: item.showFileName,
        originFilename: item.originFileName,
        path: item.path,
        extension: item.extension,
      },
      onSuccess: handleSuccess,
    });
  };

  return (
    <Button
      sx={{ width: "100%", marginRight: 1 }}
      size="small"
      variant="contained"
      fullWidth
      onClick={handleClick}
    >
      <CheckIcon />
    </Button>
  );
}

export default CaseExpenseBillEditConfirmButton;
