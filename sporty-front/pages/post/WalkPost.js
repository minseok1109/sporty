import PostForm from "../../components/PostForm";
import * as Yup from "yup";
import SelectIsRunning from "../../components/SelectIsRunning";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
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

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}

export default WalkPost;
