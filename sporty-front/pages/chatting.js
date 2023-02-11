import dynamic from "next/dynamic";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";


const DynamicAppWithNoSSR = dynamic(() => import("../components/Chat/Chat"), {
  ssr: false,
  loading: () => <p>로딩중입니다.</p>,
});


export default function Chatting({ user }) {


  return (
    <>
      <DynamicAppWithNoSSR user={user} />

    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    const { user } = session;
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  }
}
