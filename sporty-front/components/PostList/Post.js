import PostCard from "./LayOut/PostCard";
import BlackOutlinedButton from "../Buttons.js/BlackOutlinedButton";

export default function Post({ post }) {
    const { author, title, location, description, date, exercise } = post;
    return (
        <>
            <div>
                <BlackOutlinedButton exercise={exercise}>

                </BlackOutlinedButton>

            </div>
            <div className="card">
                <PostCard
                    author={author.username}
                    title={title}
                    exercise={exercise}
                    location={location}
                    date={date}
                    deacription={description}
                ></PostCard>
            </div>

            <style jsx>{`
            
    `}</style>
        </>

    );

}

