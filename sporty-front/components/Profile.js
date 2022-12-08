import { useEffect, useState } from "react";
import { Paper, Avatar, Box, Typography, Breadcrumbs } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useAppContext } from "../store";
import Link from "next/link";

const accountBreadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/account/login">
    로그인
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/account/signUp">
    회원가입
  </Link>,
];

const postBreadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="#">
    내가 쓴 글
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="#">
    신청한 글
  </Link>,
  <Link underline="hover" key="3" color="inherit" href="/account/logOut">
    로그아웃
  </Link>,
];

export default function Profile() {
  let [userData, setUserData] = useState({});
  let [showloginLink, setshowloginLink] = useState(false);
  const { store } = useAppContext();
  const { isAuthenticated, jwtToken } = store;

  useEffect(() => {
    const header = { Authorization: `JWT ${jwtToken}` };
    const getUserData = () => {
      fetch("http://localhost:8000/accounts/api/user", header)
        .then((response) => response.json())
        .then((json) => console.log(json));
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getIsAuthenticated = () => {
      isAuthenticated ? setshowloginLink(true) : setshowloginLink(false);
    };
    getIsAuthenticated();
  }, [showloginLink]);

  let { username, email } = userData;

  return (
    <Paper
      sx={{ maxWidth: 768, minWidth: 320, maxHeight: 130, border: 1, my: 3 }}
    >
      {showloginLink ? (
        <Box>
          <Avatar
            variant="outlined"
            elevation="3"
            sx={{
              bgcolor: blue[500],
              margin: 2,
              width: 56,
              height: 56,
              position: "absolute",
            }}
          >
            S
          </Avatar>
          <Box component="div" sx={{ position: "relative", left: 100 }}>
            <Typography>아이디: {email}</Typography>
            <Typography>닉네임 : {username}</Typography>
            <Typography>학교 : </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <Breadcrumbs
              separator="|"
              aria-label="breadcrumb"
              color="text.primary"
            >
              {postBreadcrumbs}
            </Breadcrumbs>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: "auto",
            alignItems: "center",
            top: 50,
            left: 50,
          }}
        >
          <Breadcrumbs
            separator="|"
            aria-label="breadcrumb"
            color="text.primary"
          >
            {accountBreadcrumbs}
          </Breadcrumbs>
        </Box>
      )}
    </Paper>
  );
}
