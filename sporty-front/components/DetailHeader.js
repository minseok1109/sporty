import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

function DetailHeader({ location, start_date_time }) {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.header,
        display: " flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "column",
        borderBottom: 1,
        padding: 3,
        borderRadius: "0px 0px 30px 30px",
      }}
    >
      <Button onClick={() => router.back()} color="white">
        <ArrowBackIcon />
      </Button>
      <Box
        sx={{
          display: " flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" color="#ffff">
          {start_date_time}
        </Typography>
        <Typography variant="h5" color="#ffff">
          {location}
        </Typography>
      </Box>
    </Box>
  );
}

export default DetailHeader;
