import BasketButton from "./BasketButton";
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { purple } from "@mui/material/colors";
import BasketPostDetail from "./BasketPostDetail";
import Button from '@mui/material/Button';


export default function BasketPostCard({ post, handleApply }) {
  const { author, title, date, location, level, cruit, gameinfo, description, is_apply } =
    post;
  const { username, avatar } = author;
  return (
    <>
      <div>
        <BasketButton />
      </div>
      <div className="card">
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader action={[
            is_apply ? (
              <Button onClick={() => handleApply({ post, isapply: false })}> 취소하기 </Button>
            ) : (
              <Button onClick={() => handleApply({ post, isapply: true })}>함께 하기</Button>
            )
          ]}>
            avatar=
            {
              <Avatar sx={{ bgcolor: purple[300] }} aria-label="recipe">
                {avatar}
              </Avatar>
            }
            <div>{username}</div>
          </CardHeader>

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {title}
              {date}
              {location}
              {cruit}
            </Typography>
          </CardContent>
          <BasketPostDetail
            username={username}
            title={title}
            date={date}
            location={location}
            level={level}
            cruit={cruit}
            gameinfo={gameinfo}
            deacription={description}
          ></BasketPostDetail>
        </Card>
      </div>
    </>
  );
}
