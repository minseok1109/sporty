import React from "react";
import { useStoreState } from "../store";
import PostList from "../components/PostLists/PostList";
import { Tabs } from "antd";

function ApplyPost() {
  const store = useStoreState();

  const { jwtToken } = store;
  const headers = { Authorization: `JWT ${jwtToken}` };
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
