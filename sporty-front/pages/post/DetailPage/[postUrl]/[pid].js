import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { backend_api } from "../../../../axiosInstance";
import dayjs from "dayjs";
import DetailHeader from "../../../../components/DetailHeader";
import ApplyBottomNavigation from "../../../../components/BottomNavigation/ApplyBottomNavigation";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Head from "next/head";

function DetailPage({ data, pid, postUrl, accessToken, user, comments_data }) {
  //글 데이터
  //postUserId: 글 쓴  사람 아이디
  const {
    author: { id: postUserId, avatar, nickname },
    created_at,
    start_date_time,
    description,
    level,
    location,
    apply_user_set,
    cruit,
    sex,
    amountOfGym,
    isRunning,
    questionToApplyer,
  } = data;
  const createdDate = dayjs(created_at);
  const todayDate = dayjs(new Date());
  const subtractDate = dayjs(todayDate).diff(createdDate, "day");
  const kindOfArtile = {
    basketposts: "농구",
    freeposts: "자유",
    workposts: "걷기",
  };

  const paperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderLeft: 6,
    borderLeftColor: "#14C57B",
  };

  let isApplyDisabled = apply_user_set.some(
    (appluUser) => appluUser === user.userId,
  );
  const isLogInUserPost = postUserId === user.userId;
  //신청인원 초과
  let overApplyCruit = apply_user_set.length === cruit;
  return (
    <>
      <Head>
        <title>{`${kindOfArtile[postUrl]} ${pid} | SPORTY`}</title>
      </Head>
      <DetailHeader
        location={location}
        start_date_time={start_date_time}
        kind={kindOfArtile[postUrl]}
      />
      <Typography variant="h4" m={2}>
        주최자
      </Typography>
      <Card sx={{ maxWidth: 345, margin: 2, borderRadius: 3 }} elevation={5}>
        <CardHeader
          avatar={
            avatar !== null ? (
              <Avatar alt={nickname} src={avatar} />
            ) : (
              <Avatar size="large" />
            )
          }
          title={nickname}
          titleTypographyProps={{ fontSize: 16 }}
          sx={{ background: "#F3F3F3", borderBottom: "1 solid #F3F3F3" }}
          subheader={`${subtractDate}일 전`}
        ></CardHeader>

        <CardContent sx={{ pt: 0.5 }}>
          <Typography gutterBottom={true} fontSize={14}>
            {description}
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="h4" align="center">
        정보
      </Typography>

      <Grid container spacing={3} p={1}>
        <Grid item xs={6}>
          <Paper elevation={3} sx={paperStyle}>
            <Box
              sx={{
                background: "#F3F3F3",
                width: "100%",
                textAlign: "center",
              }}
            >
              인원
            </Box>
            <Box>{cruit}</Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} sx={paperStyle}>
            <Box
              sx={{
                background: "#F3F3F3",
                width: "100%",
                textAlign: "center",
              }}
            >
              성별
            </Box>
            <Box>{sex}</Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {level && (
            <Paper elevation={3} sx={paperStyle}>
              <Box
                sx={{
                  background: "#F3F3F3",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                실력
              </Box>
              <Box>{level}</Box>
            </Paper>
          )}
          {isRunning && (
            <Paper elevation={3} sx={paperStyle}>
              <Box
                sx={{
                  background: "#F3F3F3",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                달리기 여부
              </Box>
              <Box>{isRunning}</Box>
            </Paper>
          )}
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} sx={paperStyle}>
            <Box
              sx={{
                background: "#F3F3F3",
                width: "100%",
                textAlign: "center",
              }}
            >
              참가비
            </Box>
            <Box>{amountOfGym === 0 ? "무료" : amountOfGym}</Box>
          </Paper>
        </Grid>
      </Grid>
      <Box display="flex" alignItems="baseline" p={1}>
        <Typography variant="h4">신청자</Typography>
        <Box component="span" ml={1}>
          <Box component="span">{comments_data.length}명</Box> / {cruit}명
        </Box>
      </Box>
      <Typography m={2} variant="h6" fontWeight={700}>
        Q. {questionToApplyer}
      </Typography>
      {/* 댓글 */}
      {comments_data &&
        Object.values(comments_data).map((comment_user) => {
          const {
            author: { avatar, nickname },
            message,
            id: commentId,
            created_at,
          } = comment_user;
          const today = dayjs(new Date());
          const comment_createdDate = dayjs(created_at);
          const subtractDate = dayjs(today).diff(comment_createdDate, "day");
          const subtractTime = dayjs(today).diff(comment_createdDate, "hour");

          return (
            <Card
              key={commentId}
              sx={{
                maxWidth: 345,
                margin: 2,
                borderRadius: 3,
                // pb: 5,
                mb: 5,
              }}
              elevation={5}
            >
              <CardHeader
                avatar={
                  avatar !== null ? (
                    <Avatar alt={nickname} src={avatar} />
                  ) : (
                    <Avatar size="large" />
                  )
                }
                title={nickname}
                titleTypographyProps={{ fontSize: 16 }}
                sx={{ background: "#F3F3F3", borderBottom: "1 solid #F3F3F3" }}
                subheader={
                  subtractDate === 0
                    ? `${subtractTime}시간 전`
                    : `${subtractDate}일 전`
                }
              ></CardHeader>

              <CardContent sx={{ pt: 0.5 }}>
                <Typography gutterBottom={true} fontSize={14}>
                  {message}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      <ApplyBottomNavigation
        pid={pid}
        postUrl={postUrl}
        isApplyDisabled={isApplyDisabled}
        isLogInUserPost={isLogInUserPost}
        accessToken={accessToken}
        questionToApplyer={questionToApplyer}
        overApplyCruit={overApplyCruit}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    const { pid, postUrl } = context.query;
    const { accessToken, user } = session;
    const headers = { Authorization: `Bearer ${accessToken}` };

    const response = await backend_api.get(`/api/${postUrl}/${pid}`);
    const data = await response.data;

    const comment_response = await backend_api({
      url: `/api/${postUrl}/${pid}/comments/`,
      method: "GET",
      headers,
    });

    const comments_data = await comment_response.data;

    return {
      props: {
        data,
        pid,
        postUrl,
        accessToken,
        user: JSON.parse(JSON.stringify(user)),
        comments_data,
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

export default DetailPage;
