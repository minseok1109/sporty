import useAxios from "axios-hooks";
import BasketPost from "./BasketPost";

export default function BasketPostList() {
  const [{ data: postList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/api/basketposts/",
  });
  return (
    <>
      <div>
        {loading && <div>Loading</div>}
        {error && <div>로딩 중 에러가 발생했습니다.</div>}
        <button type="" onClick={() => refetch()}>
          새로고침
        </button>
        {postList &&
          postList.map((post) => <BasketPost post={post} key={post.id} />)}
      </div>
    </>
  );
}
