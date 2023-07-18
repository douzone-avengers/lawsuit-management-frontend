import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { pageState } from "../state/pageState";

export type MenuItem = {
  icon: (icon: Icon) => ReactNode;
  name: string;
  url: string;
};

type Icon = {
  size?: number;
  color?: string;
};

type Props = {
  menu: MenuItem;
};

export default function Menu({ menu }: Props) {
  const navigate = useNavigate();
  const page = useRecoilValue(pageState);

  let selected = false;
  try {
    selected = page.paths[0] === menu.url.substring(1);
  } catch (e) {
    //
  }

  return (
    <div
      onClick={() => {
        navigate(menu.url);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: selected ? "black" : "white",
        width: 64,
        height: 64,
        margin: "auto",
        borderRadius: "50%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {menu.icon({ size: 32, color: selected ? "white" : "black" })}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: selected ? "white" : "black",
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          {menu.name}
        </div>
      </div>
    </div>
  );
}
