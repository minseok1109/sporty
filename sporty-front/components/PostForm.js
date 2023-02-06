import React, { cloneElement } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "antd";
import SelectPostPage from "./SelectPostPage";
import * as Yup from "yup";

export default function PostForm(props) {
  const router = useRouter();
  const { data: session, status } = useSession();

  let accessToken = null;
  if (status === "authenticated") {
    accessToken = session.accessToken;
  }

  const baseSchema = Yup.object({
    date: Yup.string().required("날짜를 입력해주세요."),
    location: Yup.string().required("장소를 입력하세요."),
    cruit: Yup.number().required("인원 수를 입력하세요."),
    amountOfGym: Yup.number().required("참가비를 입력하세요."),
    sex: Yup.string().required("성별을 입력하세요."),
    description: Yup.string().required("설명을 입력하세요."),
    questionToApplyer: Yup.string(),
  });

  const extendPropsSchema = baseSchema.concat(props?.extendSchema);
  const defaultValuesKey = Object.keys(extendPropsSchema.fields).reduce(
    (acc, curr) => {
      return {
        ...acc,
        [curr]: null,
      };
    },
    {},
  );

  const formOptions = {
    resolver: yupResolver(extendPropsSchema),
    defaultValues: defaultValuesKey,
  };
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (values) => {
    const headers = { Authorization: `Bearer ${accessToken}` };

    const { date } = values;
    let start_date_time = dayjs(date).format("YYYY-MM-DD HH:mm");

    const data = {
      start_date_time,
      ...values,
    };
    await axios
      .post(`http://localhost:8000/api/${props.toPost}/`, data, headers)
      .then(() => {
        router.push("http://localhost:3000/");
      })
      .catch((error) => {
        console.log("failed");
        console.log(error);
      });
  };

  return (
    <>
      <SelectPostPage />
      <form
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        id="postForm"
      >
        <Controller
          name="date"
          control={control}
          render={({ field }) => {
            return (
              <DatePicker
                showTime={{
                  format: "HH:mm",
                }}
                {...field}
                value={field.value || ""}
                style={{
                  width: "100%",
                  padding: "16.5px 14px",
                  margin: "14px 0px",
                }}
              />
            );
          }}
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
          name="amountOfGym"
          control={control}
          render={({ field }) => (
            <>
              <FormLabel>참가비</FormLabel>
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
                value={field.value || ""}
                error={!!errors.amountOfGym}
                helperText={
                  errors.amountOfGym
                    ? errors?.amountOfGym?.message
                    : "없으면 0원을 입력하세요."
                }
              />
            </>
          )}
        />
        <Controller
          name="sex"
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
              error={!!errors.sex}
            >
              <FormLabel>성별</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="남성"
                  control={<Radio />}
                  label="남성"
                />
                <FormControlLabel
                  value="여성"
                  control={<Radio />}
                  label="여성"
                />
                <FormControlLabel
                  value="혼성"
                  control={<Radio />}
                  label="혼성"
                />
              </RadioGroup>
            </FormControl>
          )}
        />
        {props.children &&
          cloneElement(props.children, {
            control: control,
            errors: errors,
          })}
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
              placeholder="내용"
              value={field.value || ""}
              error={!!errors.description}
              helperText={
                errors.description ? errors?.description?.message : ""
              }
            />
          )}
        />
        <Controller
          name="questionToApplyer"
          control={control}
          render={({ field }) => (
            <>
              <FormLabel>신청자들에게 궁금한 점</FormLabel>
              <TextField
                {...field}
                sx={{ marginBottom: 2 }}
                margin="dense"
                fullWidth
                required
                value={field?.value || ""}
                error={!!errors?.questionToApplyer}
                helperText={
                  errors?.questionToApplyer
                    ? errors?.questionToApplyer?.message
                    : ""
                }
                placeholder="농구공 갖고 계신가요?"
              />
            </>
          )}
        />
      </form>
    </>
  );
}
