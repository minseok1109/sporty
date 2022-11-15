import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import SimpleContainer from "../components/PostList/LayOut/Container";
import PostList from "../components/PostList/PostList";

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("PostNew")

  }

  return <>

    <section>
      <div>농구도 배드민턴도 축구도 테니스도 야구도</div>
      <div>이제 Sporty에서, 같이 하자!</div>
      <input className="search" placeholder="이메일 주소" />
      <Link href="/account/signUp" legacyBehavior>
        <button type="submit">회원가입</button>
      </Link>


      <SimpleContainer>
        <Button onClick={handleClick}> 새 게시물 작성 </Button>
        <PostList></PostList>
      </SimpleContainer>

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
      input {
        border: 1px solid #a04955;
      }
    `}</style>
  </>;
}
