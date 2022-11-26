import BasketPostModal from "./BasketPostModal";

export default function BasketPostDetail(props) {


    return (
        <BasketPostModal
            username={props.username}
            title={props.title}
            date={props.date}
            location={props.location}
            level={props.level}
            cruit={props.cruit}
            gameinfo={props.gameinfo}
            deacription={props.description}
        ></BasketPostModal>

    );
}