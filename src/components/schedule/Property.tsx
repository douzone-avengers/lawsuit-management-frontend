type Props = {
  name: string;
  value: string;
};

function Property({ name, value }: Props) {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      <div>{name}</div>
      <div>{value}</div>
    </div>
  );
}

export default Property;
