import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import dayjs from "dayjs";

function DetailHeader({ location, start_date_time, kind }) {
  const theme = useTheme();
  const router = useRouter();
  dayjs.locale("ko");
  const startDate = dayjs(start_date_time);
  const game_start = startDate.format("MM/DD(dd) a hh");
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.header,
          display: " flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          borderBottom: 1,
          padding: 3,
          borderRadius: "0px 0px 30px 30px",
        }}
      >
        <Box
          sx={{
            display: " flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Button
            onClick={() => router.back()}
            color="white"
            sx={{ px: 0, justifyContent: "flex-start" }}
          >
            <ArrowBackIcon />
          </Button>
          <Typography variant="h6" color="#ffff" fontWeight={700}>
            {game_start}시
          </Typography>
          <Typography variant="h5" color="#ffff" fontSize={18}>
            {location}
          </Typography>
        </Box>
        <Box color="#ffff" fontSize={20} fontWeight={700}>
          {kind}
        </Box>
      </Box>
    </>
  );
}

export default DetailHeader;
