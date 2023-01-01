import * as React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useAppContext } from "../../store";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DatePicker } from "antd";

export default function BasketPostNewForm() {
  const { RangePicker } = DatePicker;
  const [value, setValue] = useState(dayjs(new Date()).format("YYYY.MM.DD"));
  const router = useRouter();

  const formSchema = Yup.object().shape({
    title: Yup.string().required("제목은 필수입력입니다."),
    date: Yup.array().required("날짜를 입력해주세요."),
    location: Yup.string().required("위치를 입력해주세요."),
    level: Yup.string().required("실력을 입력해주세요."),
    cruit: Yup.number().required("인원 수를 입력해주세요."),
    hasBall: Yup.string().required("공 여부를 입력해주세요."),
    description: Yup.string().required("추가설명을 입력해주세요."),
    hasBall: Yup.boolean().required("공 여부를 입력해주세요."),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm(formOptions);

  const {
    store: { jwtToken },
  } = useAppContext();

  const onSubmit = async (values) => {
    const headers = { Authorization: `JWT ${jwtToken}` };

    const {
      title,
      date,
      location,
      level,
      cruit,
      hasBall,
      description,
      amountOfGym,
    } = values;
    console.log("🚀 ~ file: BasketPost.js:62 ~ onSubmit ~ values", values);

    let [start_date_time, end_date_time] = date.map((d) =>
      d.format("YYYY-MM-DD HH:mm"),
    );

    const data = {
      title,
      start_date_time,
      end_date_time,
      location,
      level,
      cruit,
      hasBall,
      description,
      amountOfGym,
    };
    await axios
      .post("http://localhost:8000/api/basketposts/", data, { headers })
      .then(() => {
        router.push("http://localhost:3000/");
      })
      .catch((error) => {
        console.log("failed");
        console.log(error);
      });
  };

  //Todo: 공여부  / 체육관참가비
  return (
    <form component="form" onSubmit={handleSubmit(onSubmit)} method="post">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ marginBottom: 2 }}
            margin="dense"
            fullWidth
            required
            label="제목"
            value={field.value || ""}
            error={!!errors.title}
            helperText={errors.title ? errors?.title?.message : ""}
          />
        )}
      />
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <RangePicker
            {...field}
            showTime={{
              format: "HH:mm",
            }}
            format="YYYY-MM-DD HH:mm"
            value={field.value || ""}
            style={{
              padding: "16.5px 14px",
              width: "100%",
            }}
          />
        )}
      />

      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ marginBottom: 2 }}
            margin="dense"
            fullWidth
            required
            label="장소"
            value={field.value || ""}
            error={!!errors.location}
            helperText={errors.location ? errors?.location?.message : ""}
          />
        )}
      />

      <Controller
        name="level"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ marginBottom: 2 }}
            margin="dense"
            fullWidth
            required
            label="실력"
            value={field.value || ""}
            error={!!errors.level}
            helperText={errors.level ? errors?.level?.message : ""}
          ></TextField>
        )}
      />

      <Controller
        name="cruit"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ marginBottom: 2 }}
            margin="dense"
            fullWidth
            required
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            label="인원 수"
            value={field.value || ""}
            error={!!errors.cruit}
            helperText={
              errors.cruit ? errors?.cruit?.message : "숫자만 입력하세요."
            }
          ></TextField>
        )}
      />

      <Controller
        name="hasBall"
        control={control}
        render={({ field }) => (
          <FormControl
            {...field}
            fullWidth
            sx={{
              border: "1px solid #d9d9d9",
              p: "9px 14px",
              borderRadius: 3,
            }}
            required
            margin="dense"
            error={!!errors.hasBall}
            helperText={errors.hasBall ? errors?.hasBall?.message : ""}
          >
            <FormLabel>공 여부</FormLabel>
            <RadioGroup row>
              <FormControlLabel value={true} control={<Radio />} label="O" />
              <FormControlLabel value={false} control={<Radio />} label="X" />
            </RadioGroup>
          </FormControl>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ marginBottom: 2 }}
            margin="dense"
            fullWidth
            required
            label="추가 설명"
            value={field?.value || ""}
            error={!!errors?.description}
            helperText={errors?.description ? errors?.description?.message : ""}
          />
        )}
      />

      <Controller
        name="amountOfGym"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₩</InputAdornment>
              ),
            }}
            margin="dense"
            fullWidth
            required
            label="체육관 대관비"
            value={field.value || ""}
            error={!!errors.amountOfGym}
            helperText={
              errors.amountOfGym
                ? errors?.amountOfGym?.message
                : "없으면 0원을 입력하세요."
            }
          />
        )}
      />

      <Button type="submit" variant="outlined" disabled={isSubmitting}>
        작성하기
      </Button>
    </form>
  );
}
