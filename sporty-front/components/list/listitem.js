import { useRouter } from 'next/router';

import classes from './MeetupItem.module.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function ListItem(props) {
    const router = useRouter();

    function showDetailHandler() {
        router.push('/' + props.id)

    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image="../list/soccer.jpeg"
                alt="1"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <h2>{props.type}</h2>
                    <h3>{props.date}</h3>
                    {props.address}
                    <div>모집인원 : {props.recruit}</div>
                    <div>신청인원 : {props.apply}</div>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
                <button onClick={showDetailHandler}>자세히보기</button>
            </CardActions>
        </Card>
    );
}

export default ListItem;

