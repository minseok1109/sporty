import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect } from "react";
import DetailHeader from "../../../../components/DetailHeader";
import {
  setHeader,
  useUserDispatch,
  useUserState,
} from "../../../../userStore";
import ApplyBottomNavigation from "../../../../components/BottomNavigation/ApplyBottomNavigation";

function DetailPage({ data, applyUserData, pid, postUrl }) {
  console.log(
    "🚀 ~ file: [pid].js:24 ~ DetailPage ~ applyUserData",
    applyUserData,
  );
  //글 데이터
  const {
    author: { avatar, nickname },
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
  } = data;

  const createdDate = dayjs(created_at);
  const todayDate = dayjs(new Date());
  const subtractDate = dayjs(todayDate).diff(createdDate, "day");
  const paperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderLeft: 6,
    borderLeftColor: "#14C57B",
  };

  const dispatch = useUserDispatch();
  const state = useUserState();
  const { data: user } = state.user;
  const isApplyDisabled = applyUserData?.some(
    (applyUser) => applyUser?.id === user?.id,
  );
  console.log(
    "🚀 ~ file: [pid].js:61 ~ DetailPage ~ isApplyDisabled",
    isApplyDisabled,
  );
  useEffect(() => {
    setHeader(dispatch, { location, start_date_time });
  }, []);

  return (
    <>
      <DetailHeader location={location} start_date_time={start_date_time} />
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
            <Box>인원</Box>
            <Box>{cruit}</Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} sx={paperStyle}>
            <Box component="div">성별</Box>
            <Box>{sex}</Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {level && (
            <Paper elevation={3} sx={paperStyle}>
              <Box>실력</Box>
              <Box>{level}</Box>
            </Paper>
          )}
          {isRunning && (
            <Paper elevation={3} sx={paperStyle}>
              <Box>달리기 여부</Box>
              <Box>{isRunning}</Box>
            </Paper>
          )}
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} sx={paperStyle}>
            <Box>참가비</Box>
            <Box>{amountOfGym === 0 ? "무료" : amountOfGym}</Box>
          </Paper>
        </Grid>
      </Grid>
      <Box display="flex" alignItems="baseline" p={1}>
        <Typography variant="h4">신청자</Typography>
        <Box component="span" ml={1}>
          {apply_user_set.length}명 / {cruit}명
        </Box>
      </Box>
      {applyUserData &&
        Object.values(applyUserData).map((applyUser) => {
          const { id, avatar, nickname } = applyUser;
          return (
            <Card
              key={id}
              sx={{ maxWidth: 345, margin: 2, borderRadius: 3 }}
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
                subheader={`${subtractDate}일 전`}
              ></CardHeader>

              <CardContent sx={{ pt: 0.5 }}>
                <Typography gutterBottom={true} fontSize={14}>
                  사람들이 질문 남긴 거 보여주기
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      <ApplyBottomNavigation
        pid={pid}
        postUrl={postUrl}
        disabled={isApplyDisabled}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { pid, postUrl } = context.query;
  console.log(context.query);
  let applyUserData = null;
  const response = await axios({
    url: `http://127.0.0.1:8000/api/${postUrl}/${pid}`,
    method: "GET",
  });
  const data = await response.data;
  const { apply_user_set } = await data;

  if (apply_user_set.length) {
    applyUserData = await Promise.all(
      apply_user_set.map(async (id) => {
        const response = await axios.get(
          `http://127.0.0.1:8000/accounts/api/user/${id}`,
        );
        return response.data;
      }),
    );
  }
  return { props: { data, applyUserData, pid, postUrl } };
}
export default DetailPage;
