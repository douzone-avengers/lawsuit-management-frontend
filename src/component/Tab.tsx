export type TabItem = {
  id: number;
  name: string;
  checked: boolean;
  onClick: () => void | Promise<void>;
};

type Props = {
  tab: TabItem;
};

export default function Tab({ tab }: Props) {
  return (
    <div
      style={{
        background: tab.checked ? "black" : "white",
        color: tab.checked ? "white" : "black",
      }}
      onClick={tab.onClick}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 48,
          width: 64,
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "nato",
          borderRight: "1px solid black",
        }}
      >
        {tab.name}
      </div>
    </div>
  );
}
