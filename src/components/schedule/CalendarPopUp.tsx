import PopUp from "../common/PopUp.tsx";
import CloseButton from "../common/CloseButton.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import calendarPopUpOpenState from "../../states/schedule/calendarPopUpOpenState.ts";
import calendarPopUpInfoState from "../../states/schedule/calendarPopUpInfoState.ts";
import Property from "./Property.tsx";
import { delimiter } from "../../lib/convert.ts";

function CalendarPopUp() {
  const setCalendarPopUpOpen = useSetRecoilState(calendarPopUpOpenState);
  const info = useRecoilValue(calendarPopUpInfoState);

  const handleCloseButtonClick = () => {
    setCalendarPopUpOpen(false);
  };

  return (
    <PopUp>
      <CloseButton onClick={handleCloseButtonClick} />
      {info !== null ? (
        <div>
          <Property name="사건명" value={info.lawsuit.name} />
          <Property name="사건번호" value={info.lawsuit.num} />
          <Property name="사건종류" value={info.lawsuit.type} />
          <Property
            name="의뢰비"
            value={`${delimiter(info.lawsuit.commissionFee)}원`}
          />
          <Property
            name="성공보수"
            value={`${delimiter(info.lawsuit.contingentFee)}원`}
          />
          <div style={{ display: "flex", gap: 5 }}>
            <div>담당자</div>
            <div style={{ display: "flex", gap: 5 }}>
              {info.members.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <div>당사자</div>
            <div style={{ display: "flex", gap: 5 }}>
              {info.clients.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </div>
          </div>
          <div>
            <div>접수</div>
            <Property
              name="상태"
              value={info.reception.status ? "완료" : "미완료"}
            />
            <Property
              name="카테고리"
              value={info.reception.category === "fixed" ? "불변" : "기변"}
            />
            <Property name="내용" value={info.reception.contents} />
            <Property name="접수일" value={info.reception.receivedAt} />
            <Property name="마감일" value={info.reception.deadline} />
          </div>
        </div>
      ) : null}
    </PopUp>
  );
}

export default CalendarPopUp;
