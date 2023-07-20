import React from "react";

interface PlaceholderProps {
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  width = "100%",
  height = "100%",
  backgroundColor = "#f0f0f0",
}) => {
  const style: React.CSSProperties = {
    width,
    height,
    backgroundColor,
  };

  return <div style={style}></div>;
};

export default Placeholder;
