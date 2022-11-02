import MypageDivider from "./MypageDivider";
import Link from "next/link";
function Navbar() {
  return <>
    <header className="head">
      <Link href="/" legacyBehavior>
        <img className="img_hover" src="/icon.png" alt="icon" />
      </Link>
      <nav>
        <Link href="/" legacyBehavior>
          <a>홈</a>
        </Link>
        <Link href="/PostList" legacyBehavior>
          <a>게시글</a>
        </Link>
        <Link href="/getPeople" legacyBehavior>
          <a>모집하기</a>
        </Link>
      </nav>
      <input placeholder="종목을 입력하세요" />
      <MypageDivider />
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
  </>;
}

export default Navbar;
