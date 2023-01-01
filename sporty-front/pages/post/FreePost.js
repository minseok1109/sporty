import * as React from "react";
import { Button, TextField } from "@mui/material";
import { useAppContext } from "../../store";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DatePicker } from "antd";

export default function FreePostForm() {
  const { RangePicker } = DatePicker;
  const router = useRouter();

  const formSchema = Yup.object().shape({
    title: Yup.string().required("제목은 필수입력입니다."),
    date: Yup.array().required("날짜를 입력해주세요."),
    location: Yup.string(),
    description: Yup.string(),
    cruit: Yup.number(),
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

    const { title, date, location, cruit, description } = values;

    let [start_date_time, end_date_time] = date.map((d) =>
      d.format("YYYY-MM-DD HH:mm"),
    );

    const data = {
      title,
      start_date_time,
      end_date_time,
      location,
      cruit,
      description,
    };
    console.log(data);
    await axios
      .post("http://localhost:8000/api/freeposts/", data, { headers })
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
            style={{
              width: "100%",
              padding: "16.5px 14px",
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
