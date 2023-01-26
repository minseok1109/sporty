import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Avatar as MuiAvatar } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { Card, CardHeader, CardContent } from "@mui/material";

export default function PostCard({ post }) {
  const { author, start_date_time, location } = post;

  const { avatar, nickname } = author;

  dayjs.locale("ko");
  const startDate = dayjs(start_date_time);
  const game_start = startDate.format("MM/DD(dd) a hh");

  return (
    <Card
      sx={{
        width: 319,
        height: 100,
        border: 1,
        margin: 2,
        borderRadius: 13 / 4,
      }}
    >
      <CardHeader
        avatar={
          avatar !== null ? (
            <MuiAvatar
              alt={nickname}
              src={avatar}
              variant="square"
              sx={{ borderRadius: 3, width: 70, height: 70 }}
            />
          ) : (
            <Avatar
              size="large"
              icon={<UserOutlined />}
              sx={{ borderRadius: 3, width: 70, height: 70 }}
            />
          )
        }
        title={`${game_start}시`}
        titleTypographyProps={{ fontSize: 16, fontWeight: 700 }}
        subheader={location}
      ></CardHeader>

      <CardContent sx={{ pt: 0.5 }}></CardContent>
    </Card>
  );
}
