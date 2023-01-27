import { List, ListItem, Divider, ListItemText, Grid } from "@mui/material";
import React, { useEffect, useState, memo, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Profile from "../../components/Profile";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import axios from "axios";
import { useStoreState } from "../../store";
import { useRouter } from "next/router";

function MyPage() {
  let [postList, setPostList] = useState({});
  let [applyList, setApplyList] = useState({});
  const router = useRouter();

  const store = useStoreState();
  const { jwtToken } = store;

  const getListLength = (list) => {
    return Object.values(list).reduce((acc, curr) => {
      return (acc += curr.length);
    }, 0);
  };

  useEffect(() => {
    const headers = { Authorization: `JWT ${jwtToken}` };
    const getPostData = () => {
      ["selfbasketposts", "selfworkposts", "selffreeposts"].map((url) => {
        let apiUrl = `http://localhost:8000/api/${url}`;
        return axios({ url: apiUrl, method: "GET", headers })
          .then((res) => res.data)
          .then((item) =>
            setPostList((prev) => {
              return { ...prev, [url]: item };
            }),
          );
      });
    };
    const getApplyData = () => {
      ["applybasketposts", "applyworkposts", "applyFreeposts"].map((url) => {
        let apiUrl = `http://localhost:8000/api/${url}`;
        return axios({ url: apiUrl, method: "GET", headers })
          .then((res) => res.data)
          .then((item) =>
            setApplyList((prev) => {
              return { ...prev, [url]: item };
            }),
          );
      });
    };
    getPostData();
    getApplyData();
  }, []);
  //내가 쓴 글 갯수
  let postListLength = useMemo(() => getListLength(postList), [postList]);
  let applyListLength = useMemo(() => getListLength(applyList), [applyList]);
  return (
    <>
      <Grid container direction="row" alignItems="baseline" mt={1} py={2}>
        <Grid
          xs={2}
          textAlign="center"
          item={true}
          onClick={() => router.back()}
        >
          <CloseIcon />
        </Grid>
        <Grid xs={8} fontSize={30} textAlign="center" item={true}>
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
        <Link href="/MyPost">
          <ListItem alignItems="center">
            <ListItemText
              primary="내가 쓴 글"
              secondary={`${postListLength}개의 글`}
            />
            <NavigateNextIcon />
          </ListItem>
        </Link>
        <Divider variant="fullWidth" component="li" />
        <Link href="/ApplyPost">
          <ListItem alignItems="center">
            <ListItemText
              primary="내가 신청한 글"
              secondary={`${applyListLength}개의 글`}
            />
            <NavigateNextIcon />
          </ListItem>
        </Link>
        <Divider variant="fullWidth" component="li" />
        <Link href="/account/logOut">
          <ListItem alignItems="center">
            <ListItemText primary="로그아웃" />
          </ListItem>
        </Link>
      </List>
    </>
  );
}

export default memo(MyPage);
