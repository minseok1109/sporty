import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";

export default function SelectIsRunning({ control, errors }) {
  return (
    <Controller
      name="isRunning"
      control={control}
      render={({ field }) => (
        <FormControl
          {...field}
          fullWidth
          sx={{
            p: "9px 14px",
          }}
          required
          margin="dense"
          error={!!errors.isRunning}
        >
          <FormLabel>달리기 여부</FormLabel>
          <RadioGroup row>
            <FormControlLabel value={"O"} control={<Radio />} label="O" />
            <FormControlLabel value={"X"} control={<Radio />} label="X" />
            <FormControlLabel
              value={"상관없음"}
              control={<Radio />}
              label="상관없음"
            />
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}
