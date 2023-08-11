import { useRecoilState } from "recoil";
import { useEffect } from "react";
import * as dayjs from "dayjs";
import calendarDateState from "../../states/schedule/calendarDateState.ts";
import calendarItemsState, {
  CalendarItemType,
} from "../../states/schedule/calendarItemsState.ts";
import calendarInformationsState, {
  CalendarInformationType,
} from "../../states/schedule/calendarInformationsState.ts";
import CalendarCell, { CalendarCellType } from "./CalendarCellType.tsx";
import request, { RequestSuccessHandler } from "../../lib/request.ts";

export function toYyyyMmDd(year: number, month: number, date: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(
    2,
    "0",
  )}`;
}

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

      request(
        "GET",
        `/schedules?start-deadline=${startDeadline}&end-deadline=${endDeadline}`,
        {
          onSuccess: handleRequestSucccess,
          useMock: false,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        width: "100%",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {calendarDate.year}년 {calendarDate.month}월
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ cursor: "pointer" }} onClick={handlePrevMonthButton}>
          이전
        </div>
        <div style={{ cursor: "pointer" }} onClick={handleNextMonthButton}>
          다음
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          height: 60,
          gap: 30,
        }}
      >
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 30,
        }}
      >
        {calendarCells.map((item) => (
          <CalendarCell
            key={`${item.calendar.year}${item.calendar.month}${item.calendar.date}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
