export type CardItem = {
  id: number;
  name: string;
  checked: boolean;
  onClick: () => void | Promise<void>;
};

type Props = {
  card: CardItem;
};

export default function Card({ card }: Props) {
  return (
    <div
      style={{
        borderRadius: 20,
        background: card.checked ? "black" : "white",
        color: card.checked ? "white" : "black",
      }}
      onClick={card.onClick}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: 24,
          height: 48,
          fontSize: 18,
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        {card.name}
      </div>
    </div>
  );
}
