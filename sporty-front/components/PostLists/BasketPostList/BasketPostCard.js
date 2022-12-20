import React from "react";
import BasketPostDetail from "./BasketPostDetail";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeFilledTwoToneIcon from "@mui/icons-material/AccessTimeFilledTwoTone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  color: theme.palette.text.primary,
}));

export default function BasketPostCard({ post, handleApply }) {
  const {
    author,
    title,
    date,
    location,
    level,
    cruit,
    gameinfo,
    description,
    is_apply,
    created_at,
  } = post;
  const { avatar, nickname } = author;
  const created_at_date = dayjs(created_at);
  const now_date = dayjs(new Date());
  const subtract_date = now_date.diff(created_at_date, "d");
  const game_start_date = dayjs(date).format("YYYY.MM.DD");
  const game_start_hour =
    dayjs(date).get("hour") < 10
      ? `0${dayjs(date).get("hour")}`
      : dayjs(date).get("hour");
  const game_start_minute =
    dayjs(date).get("minute") < 10
      ? `0${dayjs(date).get("minute")}`
      : dayjs(date).get("minute");
  return (
    <Card sx={{ maxWidth: 345, border: 1, margin: 2 }}>
      <CardHeader
        action={[
          is_apply ? (
            <Button
              variant="outlined"
              onClick={() => handleApply({ post, isapply: false })}
            >
              {" "}
              취소하기{" "}
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => handleApply({ post, isapply: true })}
            >
              함께 하기
            </Button>
          ),
        ]}
        avatar={avatar !== null ? avatar : <PersonIcon />}
        title={nickname}
        titleTypographyProps={{ fontSize: 16 }}
        subheader={`${subtract_date}일 전`}
      ></CardHeader>

      <CardContent sx={{ pt: 0.5 }}>
        <Typography>{title}</Typography>
        <Typography sx={{ color: "#3c3c43" }}>
          {description.length <= 20
            ? description
            : `${description.substring(0, 20)}.....more`}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Item>{gameinfo}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <PlaceIcon sx={{ mr: 1 }} />
              {location}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <CalendarMonthIcon sx={{ mr: 1 }} />
              {game_start_date}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <AccessTimeFilledTwoToneIcon sx={{ mr: 1 }} />
              {game_start_hour}:{game_start_minute}~{game_start_hour}:
              {game_start_minute}
            </Item>
          </Grid>
        </Grid>
      </CardContent>
      <BasketPostDetail
        username={nickname}
        title={title}
        date={date}
        location={location}
        level={level}
        cruit={cruit}
        gameinfo={gameinfo}
        deacription={description}
      />
    </Card>
  );
}
