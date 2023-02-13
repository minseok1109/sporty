import PostList from "../components/PostLists/PostList";
import { Tabs } from "antd";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ComponentBottom from "../components/BottomNavigation/ComponentBottom";

export default function Home({ isLoggedIn }) {
  const postListArr = [
    {
      label: "농구",
      key: "1",
      children: <PostList postListUrl={"basketposts"} />,
    },
    {
      label: "걷기",
      key: "2",
      children: <PostList postListUrl={"workposts"} />,
    },
    {
      label: "자유",
      key: "3",
      children: <PostList postListUrl={"freeposts"} />,
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

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const isLoggedIn = session ? true : false;
  return {
    props: {
      isLoggedIn,
    },
  };
}
