import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CaseAdvices from "../case/CaseAdvices";
import CaseExpenses from "../case/CaseExpenses";
import CaseJudgement from "../case/CaseJudgement";
import CaseProfile from "../case/CaseProfile";
import { CardItem } from "../component/Card";
import CardList from "../component/CardList";
import Main from "../component/Main";
import RegisterForm from "../component/RegisterForm";
import { TabItem } from "../component/Tab";
import TabList from "../component/TabList";
import { ROOT } from "../constant/url";
import { cardsState } from "../state/cardsState";
import { caseIdState } from "../state/caseIdState";
import { uiState } from "../state/uiState";

export default function CasePage() {
  const [caseId, setCaseId] = useRecoilState(caseIdState);
  const [ui, setUi] = useRecoilState(uiState);
  const [cards, setCards] = useRecoilState(cardsState);

  // 카드
  useEffect(() => {
    (async () => {
      const data: {
        id: number;
        name: string;
        url: string;
      }[] = (await axios.get(`${ROOT}/lawsuits`)).data;
      const newCards: CardItem[] = data.map(
        (item: { id: number; name: string; url: string }) => {
          return {
            id: item.id,
            name: item.name,
            checked: false,
            onClick: async () => {
              const { data } = await axios.get(item.url);
              setCaseId(data.id);
              setCurTabId(0);
            },
          };
        }
      );
      setCards(newCards);
    })();
  }, []);
  useEffect(() => {
    const newCards = cards.map((item) => {
      return { ...item, checked: caseId === item.id };
    });
    setCards(newCards);
  }, [caseId]);

  // 탭
  const [tabs, setTabs] = useState<TabItem[]>([
    {
      id: 0,
      name: "기 본",
      checked: false,
      onClick: () => {
        handleTabClick(0);
      },
    },
    {
      id: 1,
      name: "상 담",
      checked: false,
      onClick: () => {
        handleTabClick(1);
      },
    },
    {
      id: 2,
      name: "지 출",
      checked: false,
      onClick: () => {
        handleTabClick(2);
      },
    },
    {
      id: 3,
      name: "종 결",
      checked: false,
      onClick: () => {
        handleTabClick(3);
      },
    },
  ]);
  const [curTabId, setCurTabId] = useState<number | null>(null);
  useEffect(() => {
    const newTabs = [...tabs].map((item) => {
      return { ...item, checked: item.id === curTabId };
    });
    setTabs(newTabs);
  }, [curTabId]);
  const handleTabClick = (id: number) => {
    const newTabs = tabs.map((item) => ({
      ...item,
      checked: item.id === id,
    }));
    setTabs(newTabs);
    setCurTabId(id);
  };

  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      <div>
        <CardList
          cards={cards}
          onRegisterButtonClick={() => {
            setUi({
              ...ui,
              registerForm: true,
            });
          }}
        />
      </div>
      {curTabId !== null ? (
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <TabList tabs={tabs} />
          <Main>
            {curTabId === 0 ? (
              <CaseProfile />
            ) : curTabId === 1 ? (
              <CaseAdvices />
            ) : curTabId === 2 ? (
              <CaseExpenses />
            ) : curTabId === 3 ? (
              <CaseJudgement />
            ) : null}
          </Main>
        </div>
      ) : null}
      {ui.registerForm ? <RegisterForm /> : null}
    </div>
  );
}
