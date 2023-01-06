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
import axios from "axios";
import dayjs from "dayjs";

function DetailPage({ data, applyUserData }) {
  const {
    author: { avatar, nickname },
    created_at,
    start_date_time,
    description,
    level,
    location,
    apply_user_set,
    hasBall,
    cruit,
  } = data;
  const createdDate = dayjs(created_at);
  const todayDate = dayjs(new Date());
  const subtractDate = dayjs(createdDate).subtract(todayDate).get("D");

  const paperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderLeft: 6,
    borderLeftColor: "#14C57B",
  };
  return (
    <>
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
            <Box>남성</Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} sx={paperStyle}>
            <Box>실력</Box>
            <Box>{level}</Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} sx={paperStyle}>
            <Box>참가비</Box>
            <Box>무료</Box>
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
    </>
  );
}

export async function getServerSideProps(context) {
  const { pid } = context.query;
  let applyUserData = null;
  const response = await axios({
    url: `http://127.0.0.1:8000/api/basketposts/${pid}`,
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
  return { props: { data, applyUserData } };
}
export default DetailPage;
