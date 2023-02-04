import React from "react";
import PostForm from "../../components/PostForm";
import SelectLevel from "../../components/SelectLevel";
import * as Yup from "yup";

function BasketPost() {
  const levelSchema = Yup.object({
    level: Yup.string().required("실력을 입력해주세요."),
  });

  return (
    <PostForm extendSchema={levelSchema} toPost={"basketposts"}>
      <SelectLevel />
    </PostForm>
  );
}

export default BasketPost;

// export async function getServerSideProps({ req, res }) {
//   const { cookies } = req;
//   console.log(
//     "🚀 ~ file: BasketPost.js:22 ~ getServerSideProps ~ cookies",
//     cookies,
//   );

//   return {
//     props: {
//       data: null,
//     },
//   };
// }
