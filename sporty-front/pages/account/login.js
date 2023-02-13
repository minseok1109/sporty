import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Container, Typography, Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import * as Yup from "yup";

import { signIn } from "next-auth/react";
export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
        callbackUrl: "http://localhost:3000/",
      });
      await router.push(response.url);
    } catch (error) {
      const options = {
        preventDuplicate: true,
        autoHideDuration: 3000,
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      };
      enqueueSnackbar("아이디와 비멀번호를 확인하세요", options);
      console.error(error);
    }
  };

  const formSchema = Yup.object().shape({
    username: Yup.string().required("아이디는 필수입력입니다."),
    password: Yup.string()
      .required("비밀번호 입력은 필수입니다.")
      .min(8, "8자리 이상 비밀번호를 사용하세요"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm(formOptions);

  return (
    <Container maxWidth="sm">
      <Link href="/">
        <Typography
          variant="h2"
          fontWeight="700"
          textAlign="center"
          my={5}
          sx={{ cursor: "pointer" }}
        >
          SPORTY
        </Typography>
      </Link>
      <Typography sx={{ textAlign: "center", fontSize: 34 }}>로그인</Typography>
      <Typography sx={{ textAlign: "center", fontSize: 14 }}>
        SPROTY에 오신 것을 환영합니다.
      </Typography>
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
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isSubmitting}
        >
          SPORTy 로그인
        </Button>
      </form>
      <Typography>
        아직 가입을 안하셨나요?
        <Link href="/account/signUp">회원가입 하러가기</Link>
      </Typography>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}
