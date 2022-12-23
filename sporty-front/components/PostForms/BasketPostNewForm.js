import * as React from "react";
import { Button, TextField, MenuItem, Box } from "@mui/material";
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
    location: Yup.string(),
    level: Yup.string(),
    cruit: Yup.number(),
    gameinfo: Yup.string(),
    description: Yup.string(),
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

    const { title, date, location, level, cruit, gameinfo, description } =
      values;

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
      gameinfo,
      description,
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
            label="난이도"
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
        name="gameinfo"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ marginBottom: 2 }}
            margin="dense"
            fullWidth
            required
            label="게임 정보"
            value={field.value || ""}
            error={!!errors.gameinfo}
            helperText={errors.gameinfo ? errors?.gameinfo?.message : ""}
          />
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
            value={field.value || ""}
            error={!!errors.description}
            helperText={errors.description ? errors?.description?.message : ""}
          />
        )}
      />
      <Button type="submit" variant="outlined" disabled={isSubmitting}>
        작성하기
      </Button>
    </form>
  );
}
