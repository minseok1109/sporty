import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function SelectLevel({ control, errors }) {
  return (
    <Controller
      name="level"
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
          error={!!errors.level}
          helperText={errors.level ? errors?.level?.message : ""}
        >
          <FormLabel>실력</FormLabel>
          <RadioGroup row>
            <FormControlLabel value="하" control={<Radio />} label="하" />
            <FormControlLabel value="중" control={<Radio />} label="중" />
            <FormControlLabel value="상" control={<Radio />} label="상" />
            <FormControlLabel
              value="상관없음"
              control={<Radio />}
              label="상관없음"
            />
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}
