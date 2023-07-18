import { useRecoilState } from "recoil";
import { uiState } from "../state/uiState";
import Card, { CardItem } from "./Card";
import CardListToggleButton from "./CardListToggleButton";
import RegisterToggleButton from "./RegisterToggleButton";

type Props = {
  cards: CardItem[];
  onRegisterButtonClick?: () => void;
};

export default function CardList({ cards, onRegisterButtonClick }: Props) {
  const [ui] = useRecoilState(uiState);

  return (
    <div
      style={{
        paddingTop: 64,
        width: ui.cardList ? 320 : 0,
        borderRight: "1px solid black",
        height: "100%",
        position: "relative",
        transition: "width 0.5s ease",
      }}
    >
      <CardListToggleButton />
      {ui.cardList ? (
        <>
          {cards.map((item) => (
            <Card key={item.id} card={item} />
          ))}
        </>
      ) : null}
      {onRegisterButtonClick ? (
        <RegisterToggleButton onClick={onRegisterButtonClick} />
      ) : null}
    </div>
  );
}
