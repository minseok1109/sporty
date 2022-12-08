import BasketPostCard from "./BasketPostCard";
import BasketButton from "./BasketButton";

export default function BasketPost({ post }) {
  const { author, title, date, location, level, cruit, gameinfo, description } =
    post;
  return (
    <>
      <div>
        <BasketButton />
      </div>
      <div className="card">
        <BasketPostCard
          username={author.nickname}
          avatar={author.avatar}
          title={title}
          date={date}
          location={location}
          level={level}
          cruit={cruit}
          gameinfo={gameinfo}
          deacription={description}
        ></BasketPostCard>
      </div>
    </>
  );
}
