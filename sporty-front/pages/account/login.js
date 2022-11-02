import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {
  Breadcrumbs,
  Box,
  Container,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="#">
    아이디 찾기
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="#">
    비밀번호 찾기
  </Link>,
  <Link underline="hover" key="3" color="inherit" href="/account/signUp">
    회원가입
  </Link>,
];

export default function Login() {
  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post("http://localhost:8000/accounts/token/", data)
      .then((response) => console.log(response))
      .catch((errors) => console.log(errors));
  };

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("이메일은 필수입력입니다.")
      .email("이메일을 입력하세요"),
    password: Yup.string()
      .required("비밀번호 입력은 필수입니다.")
      .min(8, "8자리 이상 비밀번호를 사용하세요"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting,  errors },
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
          sporty
        </Typography>
      </Link>
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
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isSubmitting}
        >
          로그인
        </Button>
      </form>
      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <Breadcrumbs separator="|" aria-label="breadcrumb" color="text.primary">
          {breadcrumbs}
        </Breadcrumbs>
      </Box>
    </Container>
  );
}
