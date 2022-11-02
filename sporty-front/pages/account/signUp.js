import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();
  // 회원가입 작성 후 axios를 사용해서 벡엔드로 전송하는 함수
  const onSubmit = async (data) => {
    await axios
      .post("http://127.0.0.1:8000/accounts/signup/", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
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
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm(formOptions);

  return <>
    <header>
      <div>
        <img src="/Vector.png" alt="vector" onClick={() => router.back()} />

        <span>이미 계정이 있으신가요?</span>
      </div>
      <Link href="/account/login" legacyBehavior>
        <a>로그인</a>
      </Link>
    </header>
    <div className="container">
      <div className="slogan">
        <h2>SPORTY에 오신 것을 환영합니다!</h2>
        <h2 className="small_title">같이 운동하러 가볼까요?</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          name="email"
          aria-invalid={
            !isDirty ? undefined : errors.email ? "true" : "false"
          }
          {...register("email")}
        />
        {errors?.email && (
          <small role="alert">{errors?.email?.message}</small>
        )}
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-invalid={
            !isDirty ? undefined : errors.password ? "true" : "false"
          }
          {...register("password")}
        />
        {errors?.password && (
          <small role="alert">{errors?.password?.message}</small>
        )}
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="password"
          id="password_confirm"
          name="password"
          aria-invalid={
            !isDirty ? undefined : errors.password_confirm ? "true" : "false"
          }
          {...register("password_confirm")}
        />
        {errors?.password_confirm && (
          <small role="alert">{errors?.password_confirm?.message}</small>
        )}
        <button type="submit" disabled={isSubmitting}>
          회원가입
        </button>
      </form>

      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          width: 40rem;
          padding: 1rem;
        }
        a {
          color: #009ddc;
        }
        h2 {
          font-size: 48px;
          font-weight: 700;
        }
        input {
          margin: 20px;
          width: 440px;
          height: 48px;
          border: 1px solid #c5c5c5;
          border-radius: 8px;
        }
        img {
          cursor: pointer;
        }

        button {
          background: #009ddc;
          border-radius: 8px;
          width: 440px;
          height: 52px;
          color: white;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        small {
          color: red;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .small_title {
          color: #009ddc;
        }
        .container {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }
        .slogan {
          margin: 30px;
          padding: 30px;
        }
      `}</style>
    </div>
  </>;
}
