import { memo } from "react";
import { Avatar, Grid, Typography, Badge, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Link from "next/link";
//아바타 카메라 뱃지
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  color: theme.palette.text.secondary,
  marginRight: 5,
}));

function Profile({ user }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      my={3}
      p={1}
      spacing={1}
    >
      <Grid item xs={2}>
        <Link href="/UploadProfile">
          <a>
            <Item>
              {user?.avatar ? (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <SmallAvatar>
                      <CameraAltOutlinedIcon />
                    </SmallAvatar>
                  }
                >
                  <Avatar
                    variant="square"
                    src={user?.avatar}
                    sx={{
                      border: "5px solid #00AD70",
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                    }}
                  />
                </Badge>
              ) : (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <SmallAvatar>
                      <CameraAltOutlinedIcon />
                    </SmallAvatar>
                  }
                >
                  <Avatar
                    sx={{
                      border: "5px solid #00AD70",
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                    }}
                  />
                </Badge>
              )}
            </Item>
          </a>
        </Link>
      </Grid>
      <Grid item xs={6} justifyContent="center">
        <Item pl={3}>
          <Typography variant="h6">{user?.nickname}</Typography>
          <Typography>@{user?.username}</Typography>
        </Item>
      </Grid>
    </Grid>
  );
}

export default memo(Profile);
