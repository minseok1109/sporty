import { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useUpdateEffect } from "react-use";

export default function SignUp() {
  const usernameInput = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [duplicatedError, setDuplicatedError] = useState({});
  const router = useRouter();
  // 회원가입 작성 후 axios를 사용해서 벡엔드로 전송하는 함수
  const onSubmit = async (values) => {
    const { username, password, nickname, school } = values;
    const data = { username, password, nickname, school };
    await axios
      .post("http://127.0.0.1:8000/accounts/signup/", data)
      .then(() => {
        // 회원가입 성공하면 바로 로그인페이지로
        router.push("http://localhost:3000/account/login");
      })
      .catch((error) => {
        const {
          response: {
            data: { username, nickname },
          },
        } = error;
        setDuplicatedError({ username, nickname });
      });
  };

  useUpdateEffect(() => {
    const options = {
      preventDuplicate: true,
      autoHideDuration: 3000,
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    };

    const { username, nickname } = duplicatedError;
    if (username) {
      enqueueSnackbar(
        "존재하는 아이디입니다. 다른 아이디를 입력하세요.",
        options,
      );
      usernameInput.current.focus();
    }
    if (nickname) {
      enqueueSnackbar(nickname, options);
    }
  }, [duplicatedError]);

  // todo: 아이디가 이메일 말고 그냥 아이디로 /  중복 확인 / 닉네임 필수
  // todo: 필수입력 옆에는 별표

  // 각각 입력에 대한 스키마
  const formSchema = Yup.object().shape({
    username: Yup.string().required("아이디는 필수입력입니다."),
    password: Yup.string()
      .required("비밀번호 입력은 필수입니다.")
      .min(8, "8자리 이상 비밀번호를 사용하세요"),
    password_confirm: Yup.string()
      .required("비밀번호 입력은 필수입니다.")
      .oneOf([Yup.ref("password")], "비밀번호가 다릅니다."),
    nickname: Yup.string().required("닉네임 입력은 필수입니다."),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm(formOptions);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          my: 2,
        }}
      >
        <Box>
          <img src="/Vector.png" alt="vector" onClick={() => router.back()} />
          <span>이미 계정이 있으신가요?</span>
        </Box>
        <Link href="/account/login">
          <Typography fontWeight="bold" color="#009DDC">
            <a>로그인</a>
          </Typography>
        </Link>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h2" fontWeight="700">
          SPORTY에 오신 것을 환영합니다!
        </Typography>
        <Typography variant="h4" color="#009DDC" fontWeight="700">
          같이 운동하러 가볼까요?
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ marginBottom: 2 }}
              margin="dense"
              fullWidth
              required
              label="아이디"
              value={field.value || ""}
              error={!!errors.username}
              helperText={errors.username ? errors?.username?.message : ""}
              ref={usernameInput}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ marginBottom: 2 }}
              margin="dense"
              fullWidth
              required
              label="비밀번호"
              type="password"
              value={field.value || ""}
              error={!!errors.password}
              helperText={errors?.password ? errors?.password?.message : ""}
            />
          )}
        />
        <Controller
          name="password_confirm"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ marginBottom: 2 }}
              margin="dense"
              fullWidth
              required
              label="비밀번호 확인"
              type="password"
              autoComplete="current-password"
              value={field.value || ""}
              error={!!errors?.password_confirm}
              helperText={
                errors?.password_confirm
                  ? errors?.password_confirm?.message
                  : ""
              }
            />
          )}
        />
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ marginBottom: 2 }}
              margin="dense"
              fullWidth
              required
              label="닉네임"
              type="text"
              value={field.value || ""}
              error={!!errors?.nickname}
              helperText={errors?.nickname ? errors?.nickname?.message : ""}
            />
          )}
        />
        <Controller
          name="school"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ marginBottom: 2 }}
              margin="dense"
              fullWidth
              label="학교"
              type="text"
              value={field.value || ""}
              error={!!errors?.school}
              helperText={errors?.school ? errors?.school?.message : ""}
            />
          )}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isSubmitting}
        >
          회원가입
        </Button>
      </form>
    </Container>
  );
}
