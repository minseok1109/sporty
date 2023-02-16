import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Grid,
  ListItemButton,
} from "@mui/material";
import React, { memo, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Profile from "../../components/Profile";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { backend_api } from "../../axiosInstance";
import Head from "next/head";

function MyPage({ data, postData, applyData }) {
  const router = useRouter();
  const getListLength = (list) => {
    return list.reduce((acc, curr) => {
      return (acc += Object.values(curr).flat().length);
    }, 0);
  };

  //내가 쓴 글 갯수
  let postListLength = useMemo(() => getListLength(postData), [postData]);
  let applyListLength = useMemo(() => getListLength(applyData), [applyData]);
  return (
    <>
      <Head>
        <title>My Page | SPORTY</title>
      </Head>
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
      <Profile user={data} />
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
        <ListItemButton
          alignItems="center"
          onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
        >
          <ListItemText primary="로그아웃" />
        </ListItemButton>
      </List>
    </>
  );
}
export default memo(MyPage);

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (session) {
    const { username, nickname, avatar } = await session.user;
    const { accessToken } = await session;
    const headers = { Authorization: `Bearer ${accessToken}` };
    let getPostData = await Promise.all(
      ["selfbasketposts", "selfworkposts", "selffreeposts"].map(async (url) => {
        const response = await backend_api({
          url: `/api/${url}`,
          method: "GET",
          headers,
        });
        return { [url]: response.data };
      }),
    );

    let getApplyData = await Promise.all(
      ["applybasketposts", "applyworkposts", "applyFreeposts"].map(
        async (url) => {
          const response = await backend_api({
            url: `/api/${url}`,
            method: "GET",
            headers,
          });
          return { [url]: response.data };
        },
      ),
    );

    return {
      props: {
        data: { username, nickname, avatar },
        postData: getPostData,
        applyData: getApplyData,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/account/login",
      },
      props: {},
    };
  }
}
