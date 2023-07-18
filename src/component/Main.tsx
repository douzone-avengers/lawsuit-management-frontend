import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function Main({ children }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        margin: 10,
        flexGrow: 1,
        border: "1px solid black",
      }}
    >
      {children}
    </div>
  );
}
