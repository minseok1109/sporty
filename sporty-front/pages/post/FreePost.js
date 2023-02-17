import PostForm from "../../components/PostForm";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Head from "next/head";
export default function FreePostForm() {
  return (
    <>
      <Head>
        <title>자유 | SPORTY</title>
      </Head>
      <PostForm toPost={"freeposts"}></PostForm>
    </>
  );
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
