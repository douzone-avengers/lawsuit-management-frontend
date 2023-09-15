import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { ReactNode } from "react";
import TabPanel from "./TabPanel";

export type TabItem = {
  id: number;
  name: string;
  children?: ReactNode;
};

type Props = {
  items: TabItem[];
  value: number;
  setValue: (value: number) => void;
};

export default function TabBar({ items, value, setValue }: Props) {
  // const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          {items.map((item) => (
            <Tab key={item.id} label={item.name} />
          ))}
        </Tabs>
      </Box>
      {items.map((item, index) => (
        <TabPanel key={item.id} value={value} index={index}>
          {item.children}
        </TabPanel>
      ))}
    </Box>
  );
}
