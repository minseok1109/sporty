import useAxios from "axios-hooks";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Link from "next/link";

export default function BasketPostList({ postListUrl }) {
  const [postList, setPostList] = useState([]);

  const [{ data: originPostList, loading, error }] = useAxios({
    url: `http://127.0.0.1:8000/api/${postListUrl}`,
  });

  useEffect(() => {
    setPostList(originPostList);
  }, [originPostList]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {loading && <div>Loading</div>}
      {error && <div>로딩 중 에러가 발생했습니다.</div>}
      {postList &&
        postList.map((post, index) => (
          <Link
            key={post.id}
            href={{
              pathname: "/post/DetailPage/[postUrl]/[pid]",
            }}
            as={{ pathname: `/post/DetailPage/${postListUrl}/${post.id}` }}
            legacyBehavior
          >
            <a>
              <PostCard post={post} key={index} />
            </a>
          </Link>
        ))}
    </Box>
  );
}
