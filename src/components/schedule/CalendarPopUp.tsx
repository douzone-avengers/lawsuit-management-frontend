import PopUp from "../common/PopUp.tsx";
import CloseButton from "../common/CloseButton.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import calendarPopUpOpenState from "../../states/schedule/calendarPopUpOpenState.ts";
import calendarPopUpInfoState from "../../states/schedule/calendarPopUpInfoState.ts";
import { delimiter, mapLawsuitStatus } from "../../lib/convert.ts";
import { AppBar } from "@mui/material";
import List from "@mui/material/List";
import ListProfileItem from "../common/ListProfileItem.tsx";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TagIcon from "@mui/icons-material/Tag";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import BalanceIcon from "@mui/icons-material/Balance";
import Box from "@mui/material/Box";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CategoryIcon from "@mui/icons-material/Category";

function CalendarPopUp() {
  const setCalendarPopUpOpen = useSetRecoilState(calendarPopUpOpenState);
  const info = useRecoilValue(calendarPopUpInfoState);

  const handleCloseButtonClick = () => {
    setCalendarPopUpOpen(false);
  };

  return (
    <PopUp popUpType="alert">
      <AppBar sx={{ padding: 1 }} position="static">
        <CloseButton onClick={handleCloseButtonClick} />
      </AppBar>
      {info !== null ? (
        <div
          className="custom-scroll"
          style={{ height: 400, overflowY: "scroll" }}
        >
          <List sx={{ display: "flex", flexDirection: "column", padding: 0 }}>
            <Box
              sx={{
                background: "gray",
                color: "white",
                display: "flex",
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              사건
            </Box>
            <ListProfileItem
              SvgIcon={WorkHistoryIcon}
              primary="사건 상태"
              secondary={mapLawsuitStatus(info?.lawsuit.status ?? "미정")}
            />
            <ListProfileItem
              SvgIcon={FormatListNumberedIcon}
              primary="사건 번호"
              secondary={info?.lawsuit.num ?? "미정"}
            />
            <ListProfileItem
              SvgIcon={TextFieldsIcon}
              primary="사건명"
              secondary={info?.lawsuit?.name ?? "미정"}
            />
            <ListProfileItem
              SvgIcon={TagIcon}
              primary="사건 종류"
              secondary={info?.lawsuit?.type ?? "미정"}
            />
            <ListProfileItem
              SvgIcon={BalanceIcon}
              primary="법원"
              secondary={info?.lawsuit?.courtName ?? "미정"}
            />
            <ListProfileItem
              SvgIcon={AttachMoneyIcon}
              primary="의뢰비"
              secondary={`${delimiter(info?.lawsuit.commissionFee ?? 0)}원`}
            />
            <ListProfileItem
              SvgIcon={AttachMoneyIcon}
              primary="성공 보수 비용"
              secondary={`${delimiter(info?.lawsuit.contingentFee ?? 0)}원`}
            />
            <ListProfileItem
              SvgIcon={PersonIcon}
              primary="담당자"
              secondary={
                info.members.map((item) => item.name).join(", ") ?? "미정"
              }
            />

            <ListProfileItem
              SvgIcon={PersonIcon}
              primary="당사자"
              secondary={
                info.clients.map((item) => item.name).join(", ") ?? "미정"
              }
            />
          </List>
          <List>
            <Box
              sx={{
                background: "gray",
                color: "white",
                display: "flex",
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              접수
            </Box>
            <ListProfileItem
              SvgIcon={WorkHistoryIcon}
              primary="상태"
              secondary={info.reception.status ? "완료" : "미완료"}
            />
            <ListProfileItem
              SvgIcon={CategoryIcon}
              primary="카테고리"
              secondary={info.reception.category === "fixed" ? "불변" : "기변"}
            />
            <ListProfileItem
              SvgIcon={ContentCopyIcon}
              primary="내용"
              secondary={
                info.reception.contents ? info.reception.contents : "없음"
              }
            />
            <ListProfileItem
              SvgIcon={CalendarTodayIcon}
              primary="접수일"
              secondary={info.reception.receivedAt ?? "미정"}
            />
            <ListProfileItem
              SvgIcon={CalendarTodayIcon}
              primary="마감일"
              secondary={info.reception.deadline ?? "미정"}
            />
          </List>
        </div>
      ) : null}
    </PopUp>
  );
}

export default CalendarPopUp;
