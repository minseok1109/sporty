import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
export default function SignUp() {
  const router = useRouter();
  const onSubmit = (data) => console.log(data);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();
  const testValue = getValues(["password", "password_confirm"]);
  console.log(testValue);
  return (
    <>
      <header className="header">
        <div>
          <img src="/Vector.png" alt="vector" />
          <span>이미 계정이 있으신가요?</span>
        </div>
        <Link href="/account/login">
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
            {...register("email", {
              required: "이메일은 필수입력입니다.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지않습니다.",
              },
            })}
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
            {...register("password", {
              required: "비밀번호는 필수입력입니다.",
              minLength: {
                value: 8,
                message: "8자리 이상 비밀번호를 사용하세요",
              },
            })}
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
            {...register("password_confirm", {
              required: "비밀번호 확인은 필수입력입니다.",
              minLength: {
                value: 8,
                message: "8자리 이상 비밀번호를 사용하세요",
              },
              validate: (password, password_confirm) => {
                console.log(password === password_confirm);
                password === password_confirm || "비밀번호가 일치하지않습니다.";
              },
            })}
          />
          {errors?.password
            ? undefined
            : errors?.password_confirm && (
                <small role="alert">{errors.password_confirm.message}</small>
              )}
          <button type="submit" disabled={isSubmitting}>
            회원가입
          </button>
        </form>

        <style jsx>{`
          .header {
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
    </>
  );
}
