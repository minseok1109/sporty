import React from "react";
import { useUserState } from "../userStore";
import PostList from "../components/PostLists/PostList";
import { Tabs } from "antd";

function ApplyPost() {
  const store = useUserState();

  const { accessToken } = store;
  const headers = { Authorization: `Bearer ${accessToken.data}` };
  const postListArr = [
    {
      label: "농구",
      key: "1",
      children: <PostList postListUrl={"applybasketposts"} headers={headers} />,
    },
    {
      label: "걷기",
      key: "2",
      children: <PostList postListUrl={"applyworkposts"} headers={headers} />,
    },
    {
      label: "기타",
      key: "3",
      children: <PostList postListUrl={"applyFreeposts"} headers={headers} />,
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

export default ApplyPost;
