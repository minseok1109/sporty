import PostList from "../components/PostLists/PostList";
import { Tabs } from "antd";

export default function Home() {
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
      label: "기타",
      key: "3",
      children: <PostList postListUrl={"freeposts"} />,
    },
  ];

  return (
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
  );
}
