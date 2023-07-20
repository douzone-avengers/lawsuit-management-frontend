import BalanceIcon from "@mui/icons-material/Balance";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import { ClientData } from "../../../mock/client/clientTable.ts";
import { LawsuitData } from "../../../mock/lawsuit/lawsuitTable.ts";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";
import subNavigationBarTypeState from "../../../states/layout/SubNavigationBarTypeState.tsx";
import SubNavigationBarItem, {
  SubNavigationBarItemState,
} from "./SubNavigationBarItem.tsx";
import ClientRegisterPopUpButton from "../../client/ClientRegisterPopUpButton.tsx";

function SubNavigationBar() {
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const [subNavigationBar, setSubNavigationBar] = useRecoilState(
    subNavigationBarState,
  );
  const subNavigationBarType = useRecoilValue(subNavigationBarTypeState);

  useEffect(() => {
    if (subNavigationBarType === "client") {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        const body: { data: ClientData[] } = res.data;
        const newItems: SubNavigationBarItemState[] = body.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            url: `clients/${item.id}`,
            SvgIcon: PersonIcon,
          };
        });
        setSubNavigationBar({ ...subNavigationBar, items: newItems });
      };
      request("GET", "/clients", {
        onSuccess: handleRequestSuccess,
      });
    } else if (subNavigationBarType === "caseClient") {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        const body: { data: ClientData[] } = res.data;
        const newItems: SubNavigationBarItemState[] = body.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            url: `cases/list?client=${item.id}`,
            SvgIcon: PersonIcon,
          };
        });
        setSubNavigationBar({ ...subNavigationBar, items: newItems });
      };
      request("GET", "/clients", {
        onSuccess: handleRequestSuccess,
      });
    } else if (subNavigationBarType === "case") {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        const body: { data: LawsuitData[] } = res.data;
        const newItems: SubNavigationBarItemState[] = body.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            subText: item.lawsuitNum,
            url: `cases/${item.id}?client=${clientId}`,
            SvgIcon: BalanceIcon,
          };
        });
        setSubNavigationBar({ ...subNavigationBar, items: newItems });
      };
      request("GET", `/lawsuits/clients/${clientId}`, {
        onSuccess: handleRequestSuccess,
      });
    }
  }, [subNavigationBarType]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List sx={{ width: 240, padding: 0 }}>
        {subNavigationBar.items.map((item) => (
          <SubNavigationBarItem
            key={item.id}
            item={item}
            selected={
              subNavigationBarType === "client" ||
              subNavigationBarType === "caseClient"
                ? clientId === item.id
                : subNavigationBarType === "case"
                ? caseId === item.id
                : false
            }
          />
        ))}
      </List>
      <ClientRegisterPopUpButton />
    </Box>
  );
}

export default SubNavigationBar;
