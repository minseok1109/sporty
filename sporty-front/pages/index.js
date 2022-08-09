import Link from "next/link";

export default function Home() {
  return (
    <>
      <section>
        <div>농구도 배드민턴도 축구도 테니스도 야구도</div>
        <div>이제 Sporty에서, 같이 하자!</div>
        <input placeholder="이메일 주소" />
        <Link href="/account/signUp">
          <button type="submit">회원가입</button>
        </Link>
      </section>
      <style jsx>{`
        button {
          background-color: #009ddc;
          color: #ffffff;
          border: 1px solid #ffffff;
          border-radius: 10px;
          width: 15rem;
          height: 3.125rem;
        }
      `}</style>
    </>
  );
}
