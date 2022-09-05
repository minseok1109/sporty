import { useRouter } from 'next/router';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function ListItem(props) {
    const router = useRouter();

    function showDetailHandler() {
        router.push('/' + props.id)

    }

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <h2>{props.type}</h2>
                </div>
                <div className={classes.content}>
                    <h3>{props.date}</h3>
                    <address>
                        {props.address}
                    </address>
                </div>
                <div className={classes.content}>
                    <div>모집인원 : {props.recruit}</div>
                    <div>신청인원 : {props.apply}</div>
                </div>
                <div className={classes.actions}>
                    <button onClick={showDetailHandler}>자세히보기</button>
                </div>

            </Card>
        </li>
    );
}

export default ListItem;