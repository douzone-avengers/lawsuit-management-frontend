import { ReactNode } from "react";
import CloseButton from "./CloseButton";

type Props = {
  width: number | string;
  height: number | string;
  children?: ReactNode;
  onCloseButtonClick: () => void;
};

export default function Popup({
  width,
  height,
  children,
  onCloseButtonClick,
}: Props) {
  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div style={{ position: "relative" }}>
        <CloseButton
          size={16}
          top={16}
          right={16}
          onClick={onCloseButtonClick}
        />
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "white",
              borderRadius: 20,
              width,
              height,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
