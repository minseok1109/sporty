import React from "react";
import PostForm from "../../components/PostForm";
import SelectLevel from "../../components/SelectLevel";
import * as Yup from "yup";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Head from "next/head";
function BasketPost() {
  const levelSchema = Yup.object({
    level: Yup.string().required("실력을 입력해주세요."),
  });

  return (
    <>
      <Head>
        <title>농구 | SPORTY</title>
      </Head>
      <PostForm extendSchema={levelSchema} toPost={"basketposts"}>
        <SelectLevel />
      </PostForm>
    </>
  );
}

export default BasketPost;

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
