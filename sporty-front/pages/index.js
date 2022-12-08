import Profile from "../components/Profile";
import BasketPostList from "../components/PostLists/BasketPostList/BasketPostList";
import BasketPost from "../components/PostForms/BasketPost";

export default function Home() {
  return (
    <>
      <Profile />
      <BasketPost />
      <BasketPostList />

    </>
  );
}
