import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro";
import Calendar from "@mui/icons-material/Event";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function ExpenseInfoInput() {
  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: "row", hieght: "100%" }}>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker
              slots={{ field: SingleInputDateRangeField }}
              slotProps={{
                textField: {
                  InputProps: {
                    startAdornment: <Calendar />,
                    placeholder: "월/일/년도 - 월/일/년도",
                  },
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>

      <Box>
        <TextField />
      </Box>
    </Box>
  );
}

export default ExpenseInfoInput;
