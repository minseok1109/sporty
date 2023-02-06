import PostForm from "../../components/PostForm";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
export default function FreePostForm() {
  return <PostForm toPost={"freeposts"}></PostForm>;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}
