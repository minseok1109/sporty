import React from "react";
import PostList from "../components/PostLists/PostList";
import { Tabs } from "antd";
import userStore from "../store";
function MyPost() {
  const accessToken = userStore((state) => state.accessToken);

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

export default MyPost;
