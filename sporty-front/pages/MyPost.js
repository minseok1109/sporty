import React from "react";
import PostList from "../components/PostLists/PostList";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { Tabs } from "antd";
import ComponentBottom from "../components/BottomNavigation/ComponentBottom";
function MyPost({ accessToken, isLoggedIn }) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const postListArr = [
    {
      label: "농구",
      key: "1",
      children: <PostList postListUrl={"selfbasketposts"} headers={headers} />,
    },
    {
      label: "걷기",
      key: "2",
      children: <PostList postListUrl={"selfworkposts"} headers={headers} />,
    },
    {
      label: "기타",
      key: "3",
      children: <PostList postListUrl={"selffreeposts"} headers={headers} />,
    },
  ];

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        centered
        items={postListArr.map((component, _) => {
          return {
            label: component.label,
            key: component.key,
            children: component.children,
          };
        })}
      />
      <ComponentBottom isLoggedIn={isLoggedIn} />
    </>
  );
}
export default MyPost;

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (session) {
    let isLoggedIn = true;
    const { accessToken } = await session;
    return {
      props: {
        accessToken,
        isLoggedIn,
      },
    };
  } else {
    isLoggedIn = false;
    return {
      redirect: {
        permanent: false,
        destination: "/account/login",
      },
      props: { isLoggedIn },
    };
  }
}
