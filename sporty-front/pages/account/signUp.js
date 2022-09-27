import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { Box, Container, Typography, Button, TextField } from "@mui/material";

export default function SignUp() {
  const router = useRouter();
  // 회원가입 작성 후 axios를 사용해서 벡엔드로 전송하는 함수
  const onSubmit = async (values) => {
    const { email, password } = values;
    const data = { email, password };
    await axios
      .post("http://127.0.0.1:8000/accounts/signup/", data)
      .then(() => {
        //회원가입 성공하면 바로 로그인페이지로
        router.push("http://localhost:3000/account/login");
      })
      .catch((error) => {
        console.log("failed");
        console.log(error);
      });
  };

  // 각각 입력에 대한 스키마
  const formSchema = Yup.object().shape({
    email: Yup.string().required("이메일은 필수입력입니다.").email(),
    password: Yup.string()
      .required("비밀번호 입력은 필수입니다.")
      .min(8, "8자리 이상 비밀번호를 사용하세요"),
    password_confirm: Yup.string()
      .required("비밀번호 입력은 필수입니다.")
      .oneOf([Yup.ref("password")], "비밀번호가 다릅니다."),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    reset,
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
      <Box sx={{ marginBottom: 5 }}>
        <Typography variant="h2" fontWeight="700">
          SPORTY에 오신 것을 환영합니다!
        </Typography>
        <Typography variant="h4" color="#009DDC" fontWeight="700">
          같이 운동하러 가볼까요?
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ marginBottom: 5 }}
              margin="dense"
              fullWidth
              required
              label="이메일"
              value={field.value || ""}
              error={!!errors.email}
              helperText={errors.email ? errors?.email?.message : ""}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ marginBottom: 5 }}
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
              sx={{ marginBottom: 5 }}
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
