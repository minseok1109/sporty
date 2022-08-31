import Link from "next/link";
import { useRouter } from "next/router";

export function NavButton() {
  const router = useRouter();
  return (
    <div>
      <Link href="/">
        <a>홈</a>
      </Link>
      <span> {">"} </span>
      <Link href={router.pathname}>
        <a>{router.pathname === "/article" ? "게시글" : "모집하기"}</a>
      </Link>
    </div>
  );
}
