import * as React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function TimeSelector({ value, onChange, disabled }) {
  const [time, setTime] = React.useState(
    value ? dayjs(`2000-01-01T${value}`) : null
  );

  React.useEffect(() => {
    if (value) {
      setTime(dayjs(`2000-01-01T${value}`));
    } else {
      setTime(null);
    }
  }, [value]);

  const handleChange = (newValue) => {
    setTime(newValue);
    if (newValue) {
      onChange(newValue.format("HH:mm"));
    } else {
      onChange("");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={time}
        onChange={handleChange}
        disabled={disabled}
        ampm={false}
        views={["hours", "minutes"]}
        inputFormat="HH:mm"
        slotProps={{
          textField: {
            size: "small",
            sx: {
              width: 120, // Wider so you can see "HH:mm"
              height: 30, // Keeps the shape pill-like or slightly circular
              borderRadius: 50,
              "& .MuiOutlinedInput-root": {
                borderRadius: "9999px", // Pill shape or circular look
                height: "100%",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              "& .MuiOutlinedInput-input": {
                textAlign: "center",
                padding: "6px 12px",
                fontSize: "1rem",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
