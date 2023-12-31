import { useRecoilState } from "recoil";
import { useEffect } from "react";
import dayjs from "dayjs";
import calendarDateState from "../../states/schedule/calendarDateState.ts";
import calendarItemsState, {
  CalendarItemType,
} from "../../states/schedule/calendarItemsState.ts";
import calendarInformationsState, {
  CalendarInformationType,
} from "../../states/schedule/calendarInformationsState.ts";
import CalendarCell, { CalendarCellType } from "./CalendarCellType.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { AppBar } from "@mui/material";
import styled from "styled-components";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

export function toYyyyMmDd(year: number, month: number, date: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(
    2,
    "0",
  )}`;
}

const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const CalendarHeader = styled.div<{ color?: string }>`
  display: flex;
  align-items: center;
  color: ${(props) => props?.color ?? "black"};
  margin-bottom: 10px;
`;

function Calendar() {
  const [calendarDate, setCalendarDate] = useRecoilState(calendarDateState);
  const [calendarItems, setCalendarItems] = useRecoilState(calendarItemsState);
  const [calendarInformations, setCalendarInformations] = useRecoilState(
    calendarInformationsState,
  );

  const handlePrevMonthButton = () => {
    const nextMonthValue = calendarDate.month - 1;
    const isPrevYear = nextMonthValue <= 0;
    const newCalendarDate = {
      ...calendarDate,
    };
    if (isPrevYear) {
      newCalendarDate.year = calendarDate.year - 1;
    }
    newCalendarDate.month = isPrevYear ? 12 : nextMonthValue;
    setCalendarDate(newCalendarDate);
  };

  const handleNextMonthButton = () => {
    const nextMonthValue = calendarDate.month + 1;
    const isNextYear = nextMonthValue > 12;
    const newCalendarDate = {
      ...calendarDate,
    };
    if (isNextYear) {
      newCalendarDate.year = calendarDate.year + 1;
    }
    newCalendarDate.month = isNextYear ? 1 : nextMonthValue;
    setCalendarDate(newCalendarDate);
  };

  useEffect(() => {
    const now = dayjs();
    setCalendarDate({
      year: now.year(),
      month: now.month() + 1,
    });
  }, []);

  useEffect(() => {
    if (!calendarDate.year || !calendarDate.month) {
      return;
    }
    const cur = dayjs(`${calendarDate.year}-${calendarDate.month}`);
    const lastMonthDate = cur.endOf("month").date();
    const newCalendarItems: CalendarItemType[] = [];
    for (let i = 1; i <= lastMonthDate; i++) {
      const cur = dayjs(`${calendarDate.year}-${calendarDate.month}-${i}`);
      newCalendarItems.push({
        year: cur.year(),
        month: cur.month() + 1,
        date: cur.date(),
        dayOfWeek: cur.day(),
      });
    }

    while (newCalendarItems[0].dayOfWeek !== 0) {
      const prevDay = dayjs(
        `${newCalendarItems[0].year}-${newCalendarItems[0].month}-${newCalendarItems[0].date}`,
      ).subtract(1, "day");

      newCalendarItems.unshift({
        year: prevDay.year(),
        month: prevDay.month() + 1,
        date: prevDay.date(),
        dayOfWeek: prevDay.day(),
      });
    }

    while (newCalendarItems.length < 42) {
      const lastIdx = newCalendarItems.length - 1;
      const nextDay = dayjs(
        `${newCalendarItems[lastIdx].year}-${newCalendarItems[lastIdx].month}-${newCalendarItems[lastIdx].date}`,
      ).add(1, "day");
      newCalendarItems.push({
        year: nextDay.year(),
        month: nextDay.month() + 1,
        date: nextDay.date(),
        dayOfWeek: nextDay.day(),
      });
    }
    setCalendarItems(newCalendarItems);
  }, [calendarDate]);

  useEffect(() => {
    if (calendarItems && calendarItems.length > 0) {
      const startDeadline = toYyyyMmDd(
        calendarItems[0].year,
        calendarItems[0].month,
        calendarItems[0].date,
      );

      const endDeadline = toYyyyMmDd(
        calendarItems[calendarItems.length - 1].year,
        calendarItems[calendarItems.length - 1].month,
        calendarItems[calendarItems.length - 1].date,
      );

      const handleRequestSucccess: RequestSuccessHandler = (e) => {
        setCalendarInformations(e.data as CalendarInformationType[]);
      };

      requestDeprecated(
        "GET",
        `/schedules?start-deadline=${startDeadline}&end-deadline=${endDeadline}`,
        {
          onSuccess: handleRequestSucccess,
        },
      );
    }
  }, [calendarItems]);

  const calendarCells: CalendarCellType[] = calendarItems.map((calendar) => {
    const calendarDate = toYyyyMmDd(
      calendar.year,
      calendar.month,
      calendar.date,
    );
    const informations = calendarInformations.filter(
      (item) => calendarDate === item.deadline,
    );
    return {
      calendar,
      informations,
    };
  });

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        minWidth: "100%",
        height: 780,
      }}
    >
      <AppBar position="static">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 60,
          }}
        >
          <ButtonContainer onClick={handlePrevMonthButton}>
            <IconButton sx={{ color: "white" }}>
              <KeyboardArrowLeftIcon />
            </IconButton>
          </ButtonContainer>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              fontSize: 20,
              gap: 10,
            }}
          >
            <div>{calendarDate.year}년</div>
            <div>{String(calendarDate.month).padStart(2, "0")}월</div>
          </div>
          <ButtonContainer onClick={handleNextMonthButton}>
            <IconButton sx={{ color: "white" }}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </ButtonContainer>
        </div>
      </AppBar>
      <div style={{ padding: 20 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
          }}
        >
          <CalendarHeader color="red">일</CalendarHeader>
          <CalendarHeader>월</CalendarHeader>
          <CalendarHeader>화</CalendarHeader>
          <CalendarHeader>수</CalendarHeader>
          <CalendarHeader>목</CalendarHeader>
          <CalendarHeader>금</CalendarHeader>
          <CalendarHeader color="blue">토</CalendarHeader>
        </div>
        <Divider sx={{ marginBottom: 2 }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
          }}
        >
          {calendarCells.map((item) => (
            <CalendarCell
              key={`${item.calendar.year}${item.calendar.month}${item.calendar.date}`}
              item={item}
              color={
                item.calendar.dayOfWeek % 7 === 0
                  ? "red"
                  : item.calendar.dayOfWeek % 7 === 6
                  ? "blue"
                  : "black"
              }
              background={
                item.calendar.month !== calendarDate.month
                  ? "rgba(0, 0, 0, 0.05)"
                  : ""
              }
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default Calendar;
