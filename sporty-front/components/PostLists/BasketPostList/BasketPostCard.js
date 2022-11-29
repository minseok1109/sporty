import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { purple } from "@mui/material/colors";
import BasketPostDetail from "./BasketPostDetail";

export default function BasketPostCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader>
        avatar=
        {
          <Avatar sx={{ bgcolor: purple[300] }} aria-label="recipe">
            {props.avatar}
          </Avatar>
        }
        <div>{props.username}</div>
      </CardHeader>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.title}
          {props.date}
          {props.location}
          {props.cruit}
        </Typography>
      </CardContent>
      <BasketPostDetail
        username={props.username}
        title={props.title}
        date={props.date}
        location={props.location}
        level={props.level}
        cruit={props.cruit}
        gameinfo={props.gameinfo}
        deacription={props.description}
      ></BasketPostDetail>
    </Card>
  );
}
