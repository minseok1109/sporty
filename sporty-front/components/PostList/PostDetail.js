import PostModal from "./LayOut/PostModal";

export default function PostDetail(props) {


    return (
        <PostModal
            author={props.author}
            title={props.title}
            exercise={props.exercise}
            location={props.location}
            date={props.date}
            deacription={props.description}
        ></PostModal>

    );
}