import Profile from "../components/Profile";
import BasketPost from "../components/PostForms/BasketPost";
import BasketPostList from "../components/PostLists/BasketPostList/BasketPostList";


export default function Home() {
  return (<>
    <Profile />
    <BasketPost></BasketPost>
    <BasketPostList></BasketPostList>

  </>
  );

}
