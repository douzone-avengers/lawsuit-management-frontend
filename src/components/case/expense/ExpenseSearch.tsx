import "react-day-picker/dist/style.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function ExpenseSearch() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleDateChange = (value: string | null) => {
    if (value !== null) {
      setSelectedDate(value);
    }
  };

  console.log(selectedDate);
  return (
    <Card sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="시작일"
              format="YYYY-MM-DD"
              formatDensity="spacious"
              orientation="portrait"
              onChange={handleDateChange}
            />
            -
            <DatePicker
              label="마지막일"
              format="YYYY-MM-DD"
              formatDensity="spacious"
            />
          </LocalizationProvider>
        </Box>
        <TextField label="지출 내용" sx={{ width: "50%" }} />
        <TextField label="금액" sx={{ width: "30%" }} />
        <Button
          variant="outlined"
          size="large"
          sx={{ width: "10%", height: "100%" }}
        >
          조회
        </Button>
      </CardContent>
    </Card>
  );
}

export default ExpenseSearch;
