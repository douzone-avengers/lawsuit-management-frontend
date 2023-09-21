import Box from "@mui/material/Box";
import CaseExpenseBillShowNameCell from "../cell/CaseExpenseBillShowNameCell.tsx";
import CaseExpenseBillRemoveButton from "../button/CaseExpenseBillRemoveButton.tsx";
import { CaseExpenseBillRowType } from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillState.tsx";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isEmployeeState } from "../../../../../states/user/UserState.ts";
import { isClosingCaseState } from "../../../../../states/case/info/caseInfoState.tsx";

type Props = {
  item: CaseExpenseBillRowType & { editable: boolean };
};

function CaseExpenseBillDataRow({ item }: Props) {
  const [isHover, setIsHover] = useState(false);
  const isEmployee = useRecoilValue(isEmployeeState);
  const isClosing = useRecoilValue(isClosingCaseState);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: 40,
        background: isHover ? "#DCE8F6" : "none",
        textDecoration: isHover ? "underline" : "none",
      }}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <Box
        sx={{
          width: 300,
          minWidth: 150,
          flex: 1,
        }}
      >
        <CaseExpenseBillShowNameCell item={item} />
      </Box>
      {isEmployee && !isClosing && (
        <Box sx={{ display: "flex", width: 150, minWidth: 150 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CaseExpenseBillRemoveButton item={item} />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CaseExpenseBillDataRow;
