import PostList from "../components/PostLists/PostList";
export default function Home() {
  return (
    <>
      <PostList postListUrl={"basketposts"} />
      <PostList postListUrl={"workposts"} />
      <PostList postListUrl={"freeposts"} />
    </>
  );
}
