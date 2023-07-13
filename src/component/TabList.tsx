import Tab, { TabItem } from "./Tab";

type Props = {
  tabs: TabItem[];
};

export default function TabList({ tabs }: Props) {
  return (
    <div
      style={{
        borderBottom: "1px solid black",
        width: "100%",
        display: "flex",
      }}
    >
      {tabs.map((item) => (
        <Tab key={item.id} tab={item} />
      ))}
    </div>
  );
}
