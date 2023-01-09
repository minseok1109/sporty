import * as Yup from "yup";
import PostForm from "../../components/PostForm";

export default function FreePostForm() {
  return <PostForm toPost={"freeposts"}></PostForm>;
}
