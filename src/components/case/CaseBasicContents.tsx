import { LawsuitData } from "../../mock/lawsuit/lawsuitTable.ts";
import { useRecoilValue } from "recoil";
import caseIdState from "../../states/case/CaseIdState.tsx";
import { useEffect, useState } from "react";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import BalanceIcon from "@mui/icons-material/Balance";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TagIcon from "@mui/icons-material/Tag";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CaseClientAddPopUpOpenButton from "./CaseClientAddPopUpOpenButton.tsx";

type PersonInfo = { id: number; name: string; email: string };
type CaseBasicInfoType = {
  lawsuit: LawsuitData;
  employees: PersonInfo[];
  clients: PersonInfo[];
};

function CaseBasicContents() {
  const caseId = useRecoilValue(caseIdState);
  const [caseBasicInfo, setCaseBasicInfo] = useState<CaseBasicInfoType | null>(
    null,
  );
  const theme = useTheme();

  useEffect(() => {
    if (caseId === null) {
      return;
    }

    const handleSuccessHandler: RequestSuccessHandler = (res) => {
      setCaseBasicInfo(
        (
          res.data as {
            data: CaseBasicInfoType;
          }
        ).data,
      );
    };

    request("GET", `/lawsuits/${caseId}`, {
      onSuccess: handleSuccessHandler,
    });
  }, [caseId]);

  return caseBasicInfo !== null ? (
    <List
      sx={{
        overflow: "scroll",
        paddingTop: 0,
        paddingBottom: 0,
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: 1,
          justifyContent: "center",
          alignItems: "center",
          background: theme.palette.primary.main,
          color: "white",
        }}
      >
        <Typography>사건</Typography>
      </Box>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FormatListNumberedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={caseBasicInfo.lawsuit?.lawsuitNum} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <TextFieldsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={caseBasicInfo.lawsuit?.name} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <TagIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={caseBasicInfo.lawsuit?.lawsuitType} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BalanceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={caseBasicInfo.lawsuit?.court} />
      </ListItem>
      <Box
        sx={{
          display: "flex",
          padding: 1,
          justifyContent: "center",
          alignItems: "center",
          background: theme.palette.primary.main,
          color: "white",
        }}
      >
        <Typography>당사자</Typography>
      </Box>
      {caseBasicInfo.clients.map((item) => (
        <ListItem key={item.id}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.email} />
        </ListItem>
      ))}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CaseClientAddPopUpOpenButton />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: 1,
          justifyContent: "center",
          alignItems: "center",
          background: theme.palette.primary.main,
          color: "white",
        }}
      >
        <Typography>담당자</Typography>
      </Box>
      {caseBasicInfo.employees.map((item) => (
        <ListItem key={item.id}>
          <ListItemAvatar>
            <Avatar>
              <BadgeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.email} />
        </ListItem>
      ))}
    </List>
  ) : null;
}

export default CaseBasicContents;
