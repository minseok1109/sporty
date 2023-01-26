import PostList from "../components/PostLists/PostList";
import { Tabs } from "antd";
import { useStoreState } from "../store";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useUserDispatch, getUser } from "../userStore";

export default function Home() {
  const store = useStoreState();
  const { jwtToken } = store;

  const dispatch = useUserDispatch();

  useEffect(() => {
    if (jwtToken) {
      const { user_id } = jwt_decode(jwtToken);
      getUser(dispatch, user_id);
    }
  }, [dispatch, jwtToken]);

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
