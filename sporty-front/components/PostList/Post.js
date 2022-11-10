import PostCard from "./LayOut/PostCard";
import Button from '@mui/material/Button';
export default function Post({ post }) {

    const { author, title, location, description, date, exercise } = post;
    return (
        <>
            <div className="button">
                <Button variant="outlined">{exercise}</Button>
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
            button {
                mt: 10rem;
            }
     
    `}</style>
        </>
    );

}

