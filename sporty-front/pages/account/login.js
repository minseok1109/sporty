import Link from "next/link";
import { useForm } from "react-hook-form";
export default function Login() {
  const onSubmit = (data) => console.log(data);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();
  return (
    <div className="container">
      <Link href="/" legacyBehavior>
        <div className="title">sporty</div>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          name="email"
          aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
          {
            // 이메일 제대로 입력했는지 체크
            ...register("email", {
              required: "이메일은 필수입력입니다.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지않습니다.",
              },
            })
          }
        />

        {/* // 에러메세지 띄우는 부분 */}
        {errors?.email && <small role="alert">{errors?.email?.message}</small>}
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-invalid={
            !isDirty ? undefined : errors.password ? "true" : "false"
          }
          // 비밀번호 제대로 입력했는지 체크
          {...register("password", {
            required: "비밀번호는 필수입력입니다.",
            // 최소 8자리 체크
            minLength: {
              value: 8,
              message: "8자리 이상 비밀번호를 사용하세요",
            },
          })}
        />
        {/* 비밀번호 에러메시지 띄우는 부분 */}
        {errors?.password && (
          <small role="alert">errors?.password?.message</small>
        )}

        {/* 보내는중이면 여러번 보내는거 불가능하게 */}
        <button type="submit" disabled={isSubmitting}>
          로그인
        </button>
      </form>
      <nav>
        <Link href="#" legacyBehavior>
          <a>비밀번호 찾기 | </a>
        </Link>
        <Link href="#" legacyBehavior>
          <a>아이디 찾기 | </a>
        </Link>
        <Link href="/account/signUp" legacyBehavior>
          <a>회원가입</a>
        </Link>
      </nav>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 14px 16px;
          gap: 4px;
          height: auto;
        }
        input {
          margin: 1rem;
          width: 27.5rem;
          height: 3rem;
          border: 1px solid #c5c5c5;
          border-radius: 8px;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        button {
          background: #009ddc;
          border-radius: 8px;
          width: 440px;
          height: 52px;
          color: white;
          margin-bottom: 4rem;
        }
        .title {
          font-size: 5rem;
          font-weight: 700;
          font-family: "Lato";
          margin: 1.5rem;
          padding: 1.5rem;
        }
        .title:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
