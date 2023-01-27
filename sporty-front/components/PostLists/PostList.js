import useAxios from "axios-hooks";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Link from "next/link";
import Loading from "../Loading";
import axios from "axios";

export default function PostList({ postListUrl, headers }) {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios({
      url: `http://127.0.0.1:8000/api/${postListUrl}`,
      method: "GET",
      headers,
    })
      .then((res) => setPostList(res.data))
      .then(() => setLoading(false))
      .catch((e) => setError(e));
  }, []);

  const changeUrl = {
    selfbasketposts: "basketposts",
    selfworkposts: "workposts",
    selffreeposts: "freeposts",
    applybasketposts: "basketposts",
    applyworkposts: "workposts",
    applyFreeposts: "freeposts",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {loading && <Loading />}
      {error && <div>로딩 중 에러가 발생했습니다.</div>}
      {postList &&
        postList.map((post, index) => (
          <Link
            key={post.id}
            href={{
              pathname: "/post/DetailPage/[postUrl]/[pid]",
              query: {
                postUrl: changeUrl[postListUrl] || postListUrl,
                pid: post.id,
              },
            }}
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
