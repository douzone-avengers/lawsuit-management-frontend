import caseExpenseBillState, {
  CaseExpenseBIllRowType,
} from "../../../../../states/case/info/expense/CaseExpenseBIllRowType.tsx";
import { useRecoilState } from "recoil";
import Box from "@mui/material/Box";

type Props = {
  item: CaseExpenseBIllRowType & { editable: boolean };
};

function CaseExpenseBillShowNameCell({ item }: Props) {
  const [expenseBill, setExpenseBill] = useRecoilState(caseExpenseBillState);

  return item.editable ? (
    // 파일 업로드 창
    <Box></Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
      }}
    >
      {item.showFilename}
    </Box>
  );
}

export default CaseExpenseBillShowNameCell;
