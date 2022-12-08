import Profile from "../components/Profile";
import BasketPostNew from "../components/PostFroms/BasketPostNew";
import BasketPostList from "../components/PostLists/BasketPostList/BasketPostList";

export default function Home() {
  return (
    <>
      <Profile />
      <BasketPostNew />
      <BasketPostList />
    </>
  );
}
