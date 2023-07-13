import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ClientCasesPage from "../client/ClientCasesPage";
import ClientProfilePage from "../client/ClientProfilePage";
import { CardItem } from "../component/Card";
import CardList from "../component/CardList";
import Main from "../component/Main";
import { TabItem } from "../component/Tab";
import TabList from "../component/TabList";
import { ROOT } from "../constant/url";
import { cardsState } from "../state/cardsState";
import { clientIdState } from "../state/clientIdState";
import { uiState } from "../state/uiState";

export default function ClientPage() {
  const [clientId, setClientId] = useRecoilState(clientIdState);
  const [ui, setUi] = useRecoilState(uiState);
  const [cards, setCards] = useRecoilState(cardsState);

  // 카드
  useEffect(() => {
    (async () => {
      const data: {
        id: number;
        name: string;
        url: string;
      }[] = (await axios.get(`${ROOT}/clients`)).data;
      const newCards: CardItem[] = data.map(
        (item: { id: number; name: string; url: string }) => {
          return {
            id: item.id,
            name: item.name,
            checked: false,
            onClick: async () => {
              const { data } = await axios.get(item.url);
              setClientId(data.id);
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
      return { ...item, checked: clientId === item.id };
    });
    setCards(newCards);
  }, [clientId]);

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
      name: "사 건",
      checked: false,
      onClick: () => {
        handleTabClick(1);
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
            });
          }}
        />
      </div>
      {curTabId !== null ? (
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <TabList tabs={tabs} />
          <Main>
            {curTabId === 0 ? (
              <ClientProfilePage />
            ) : curTabId === 1 ? (
              <ClientCasesPage />
            ) : null}
          </Main>
        </div>
      ) : null}
    </div>
  );
}
