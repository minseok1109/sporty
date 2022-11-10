import useAxios from "axios-hooks";
import PostModal from "../components/PostList/LayOut/PostModal";
import Post from "../components/PostList/Post";


export default function PostList() {

    const [{ data: postList, loading, error }, refetch] = useAxios({
        url: "http://localhost:8000/api/posts/"
    });

    return (
        <>
            <div>
                {loading && <div>Loading</div>}
                {error && <div>
                    로딩 중 에러가 발생했습니다.
                </div>}
                <button type="" onClick={() => refetch()}>새로고침</button>


                {/* {postList.length === 0 && (
                    
                )} */}
                {postList &&
                    postList.map(post => (
                        <Post post={post} key={post.id} />,
                    )

                    )}


            </div>
            <style jsx>{`
      button {
        background-color: #009ddc;
        color: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 10px;
        width: 15rem;
        height: 3.125rem;
      }
      Post {
        color: red;
      }
      input {
        border: 1px solid #a04955;
      }
    `}</style>

        </>);
}
