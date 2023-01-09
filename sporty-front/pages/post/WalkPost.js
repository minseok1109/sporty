import PostForm from "../../components/PostForm";
import * as Yup from "yup";
import SelectIsRunning from "../../components/SelectIsRunning";

function WalkPost() {
  const runningSchema = Yup.object({
    isRunning: Yup.string().required("달리기 여부를 선택하세요."),
  });

  return (
    <PostForm extendSchema={runningSchema} toPost={"workposts"}>
      <SelectIsRunning />
    </PostForm>
  );
}

export default WalkPost;
