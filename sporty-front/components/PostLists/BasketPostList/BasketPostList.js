import axios from "axios";
import useAxios from "axios-hooks";
import BasketPostCard from "./BasketPostCard";
import { useAppContext } from "../../../store"
import { useEffect, useState } from "react";

export default function BasketPostList() {
  const [postList, setPostList] = useState([]);

  const {
    store: { jwtToken }
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: originPostList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/api/basketposts/",
    headers
  });

  useEffect(() => {
    setPostList(originPostList);
  }, [originPostList]);

  const handleApply = async ({ post, isapply }) => {

    const apiUrl = `http://localhost:8000/api/basketposts/${post.id}/apply/`;
    const method = isapply ? "POST" : "DELETE";

    try {
      const response = await axios({
        url: apiUrl,
        method,
        headers,
      })
      console.log("response:", response);

      setPostList(prevList => {
        return prevList.map(currentPost =>
          currentPost === post
            ? { ...currentPost, is_apply: isapply }
            : currentPost
        );

      })

    } catch (error) {
      console.log("error: ", error);

    }
  };



  return (
    <>
      <div>
        {loading && <div>Loading</div>}
        {error && <div>로딩 중 에러가 발생했습니다.</div>}
        <button type="" onClick={() => refetch()}>
          새로고침
        </button>
        {postList &&
          postList.map((post) => <BasketPostCard post={post} key={post.id} handleApply={handleApply} />)}
      </div>
    </>
  );
}
