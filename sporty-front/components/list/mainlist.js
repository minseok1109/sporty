import ListItem from "./listitem";
import classes from './MeetupList.module.css';

function MainList(props) {
    return (
        <ul className={classes.list}>
            {props.lists.map((list) => (
                <ListItem
                    key={list.id}
                    id={list.id}
                    type={list.type}
                    date={list.date}
                    address={list.address}
                    recruit={list.recruit}
                    apply={list.apply}

                />))}
        </ul>

    );
}

export default MainList;