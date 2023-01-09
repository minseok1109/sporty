import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Avatar as MuiAvatar } from "@mui/material";
import dayjs from "dayjs";
import { Card, CardHeader, CardContent } from "@mui/material";

export default function PostCard({ post }) {
  const { author, start_date_time, location } = post;

  const startDate = dayjs(start_date_time);
  const { avatar, nickname } = author;

  const game_start_date = startDate.format("YYYY.MM.DD");

  return (
    <Card sx={{ width: 345, border: 1, margin: 2 }}>
      <CardHeader
        avatar={
          avatar !== null ? (
            <MuiAvatar
              alt={nickname}
              src={avatar}
              variant="square"
              sx={{ borderRadius: 3, width: 56, height: 56 }}
            />
          ) : (
            <Avatar
              size="large"
              icon={<UserOutlined />}
              sx={{ borderRadius: 3, width: 56, height: 56 }}
            />
          )
        }
        title={`${game_start_date}시`}
        fontWeight={700}
        titleTypographyProps={{ fontSize: 16 }}
        subheader={location}
      ></CardHeader>

      <CardContent sx={{ pt: 0.5 }}></CardContent>
    </Card>
  );
}
