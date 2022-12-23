import React from "react";
import BasketPostDetail from "./BasketPostDetail";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeFilledTwoToneIcon from "@mui/icons-material/AccessTimeFilledTwoTone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Avatar as MuiAvatar } from "@mui/material";
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
    start_date_time,
    end_date_time,
    location,
    level,
    cruit,
    gameinfo,
    description,
    is_apply,
    created_at,
  } = post;
  const startDate = dayjs(start_date_time);
  const endDate = dayjs(end_date_time);
  const { avatar, nickname } = author;
  const created_at_date = dayjs(created_at).format("YYYY.MM.DD");

  //오늘 날짜
  const now_date = dayjs(new Date());
  const subtract_date = now_date.diff(created_at_date, "d");

  const game_start_date = startDate.format("YYYY.MM.DD");
  //시작 시간
  const game_start_hour =
    dayjs(startDate).get("hour") < 10
      ? `0${dayjs(startDate).get("hour")}`
      : dayjs(startDate).get("hour");

  //시작 분
  const game_start_minute =
    dayjs(startDate).get("minute") < 10
      ? `0${dayjs(startDate).get("minute")}`
      : dayjs(startDate).get("minute");

  //끝나는 시간
  const game_end_hour =
    dayjs(endDate).get("hour") < 10
      ? `0${dayjs(endDate).get("hour")}`
      : dayjs(endDate).get("hour");

  //끝나는 분
  const game_end_minute =
    dayjs(endDate).get("minute") < 10
      ? `0${dayjs(endDate).get("minute")}`
      : dayjs(endDate).get("minute");

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
        avatar={
          avatar !== null ? (
            <MuiAvatar alt={nickname} src={avatar} />
          ) : (
            <Avatar size="large" icon={<UserOutlined />} />
          )
        }
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
              {game_start_hour}:{game_start_minute}~{game_end_hour}:
              {game_end_minute}
            </Item>
          </Grid>
        </Grid>
      </CardContent>
      <BasketPostDetail
        avatar={avatar}
        username={nickname}
        title={title}
        date={created_at_date}
        location={location}
        level={level}
        cruit={cruit}
        gameinfo={gameinfo}
        description={description}
      />
    </Card>
  );
}
