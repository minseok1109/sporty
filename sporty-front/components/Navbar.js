import Link from "next/link";
function Navbar() {
  return (
    <>
      <header className="head">
        <Link href="/">
          <img className="img_hover" src="/icon.png" alt="icon" />
        </Link>
        <nav>
          <Link href="/">
            <a>홈</a>
          </Link>
          <Link href="/article">
            <a>게시글</a>
          </Link>
          <Link href="/getPeople">
            <a>모집하기</a>
          </Link>
        </nav>
        <input placeholder="종목을 입력하세요" />
        <nav>
          <Link href="/account/login">
            <a>로그인</a>
          </Link>
          <Link href="/account/signUp">
            <a>회원가입</a>
          </Link>
        </nav>
      </header>
      <style jsx>{`
        .head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        a {
          padding: 10px;
          margin: 10px;
        }

        .img_hover:hover {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

export default Navbar;
