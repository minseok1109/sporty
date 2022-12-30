import dynamic from "next/dynamic";


const DynamicAppWithNoSSR = dynamic(() => import("../components/Chat/Chat"), {
    ssr: false,
    loading: () => <p>로딩중입니다.</p>
});


export default function Chatting() {
    return (
        <>
            <DynamicAppWithNoSSR />

        </>
    );
}