import Link from "next/link";
import { useRouter } from "next/router";

export function NavButton() {
  const router = useRouter();
  return (
    <div>
      <Link href="/">
        홈
      </Link>
      <span> {">"} </span>
      <Link href={router.pathname}>
        {router.pathname === "/article" ? "게시글" : "모집하기"}
      </Link>
    </div>
  );
}
