import {
  Box,
  List,
  ListItem,
  Divider,
  ListItemText,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Profile from "../../components/Profile";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import axios from "axios";
import { useAppContext } from "../../store";

function MyPage() {
  const { store } = useAppContext();
  let [postList, setPostList] = useState({});
  const { jwtToken } = store;

  useEffect(() => {
    const headers = { Authorization: `JWT ${jwtToken}` };
    const getPostData = async () => {
      let postList = ["selfbasketposts", "selfworkposts", "selffreeposts"].map(
        (url) => {
          let apiUrl = `http://localhost:8000/api/${url}`;
          return axios({ url: apiUrl, method: "GET", headers })
            .then((res) => res.data)
            .then((item) =>
              setPostList((prev) => {
                return { ...prev, [url]: item };
              }),
            );
        },
      );
      return postList;
    };
    getPostData();
  }, []);

  //내가 쓴 글 갯수
  let postListLength = Object.values(postList).reduce((acc, curr) => {
    return (acc += curr.length);
  }, 0);

  return (
    <>
      <Grid container direction="row" alignItems="baseline" mt={1} py={2}>
        <Grid xs={2} textAlign="center">
          <CloseIcon />
        </Grid>
        <Grid xs={8} fontSize={30} textAlign="center">
          내 프로필
        </Grid>
      </Grid>
      <Profile />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          p: 1,
          my: 6,
        }}
      >
        <ListItem alignItems="center">
          <ListItemText
            primary="내가 쓴 글"
            secondary={`${postListLength}개의 글`}
          />
          <NavigateNextIcon />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="center">
          <ListItemText primary="내가 신청한 글" secondary="3개의 글" />
          <NavigateNextIcon />
        </ListItem>
        <Divider variant="inset" component="li" />
        <Link href="/account/logOut">
          <ListItem alignItems="center">
            <ListItemText primary="로그아웃" />
          </ListItem>
        </Link>
      </List>
    </>
  );
}

export default MyPage;