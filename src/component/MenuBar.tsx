import { FaBalanceScale, FaUser } from "react-icons/fa";
import Menu, { MenuItem } from "./Menu";

const menuModel: MenuItem[] = [
  {
    icon: FaUser,
    name: "고 객",
    url: "/client",
  },
  {
    icon: FaBalanceScale,
    name: "사 건",
    url: "/case",
  },
  {
    icon: FaUser,
    name: "사 원",
    url: "/employee",
  },
];

export default function MenuBar() {
  return (
    <div
      style={{
        padding: "64px 0",
        borderRight: "1px solid black",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div>
        {menuModel?.map((menu) => (
          <div key={menu.name}>
            <Menu menu={menu} />
          </div>
        ))}
      </div>
    </div>
  );
}
