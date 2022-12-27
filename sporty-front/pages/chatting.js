import dynamic from "next/dynamic";
import Chat from "../components/Chat/Chat"
import Profile from "../components/Profile";

// const DynamicAppWithNoSSR = dynamic(() => import("../components/Chat/Chat"), {
//     ssr: false,
//     loading: () => <p>로딩중입니다.</p>
// });


export default function Chatting() {
    return (
        <>
            {/* <DynamicAppWithNoSSR /> */}
            <Chat></Chat>
            <Profile></Profile>
        </>
    );
}