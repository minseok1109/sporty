import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { pink, purple, red } from '@mui/material/colors';
import PostDetail from "../PostDetail";

export default function PostCard(props) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: purple[300] }} aria-label="recipe">
                        {props.author}
                    </Avatar>
                }

            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.title}
                    {props.exercise}
                    {props.location}
                    {props.date}
                    {props.description}
                </Typography>
            </CardContent>
            <PostDetail
                author={props.author}
                title={props.title}
                exercise={props.exercise}
                location={props.location}
                date={props.date}
                deacription={props.description}
            ></PostDetail>
        </Card>
    );

}

