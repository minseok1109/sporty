import {
  Paper,
  Button,
  Drawer,
  Typography,
  Box,
  TextField,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function ApplyBottomNavigation({
  pid,
  postUrl,
  isApplyDisabled,
  isLogInUserPost,
  accessToken,
  questionToApplyer,
  overApplyCruit,
}) {
  const router = useRouter();
  const headers = { Authorization: `Bearer ${accessToken}` };
  const [state, setState] = useState({
    bottom: false,
  });
  const [comment, setComment] = useState("");

  const handleCommentInput = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    console.log(event);
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleApply = async () => {
    const apiUrl = `http://127.0.0.1:8000/api/${postUrl}/${pid}/apply/`;
    const method = "POST";

    try {
      await axios({
        url: apiUrl,
        method,
        headers,
      });
      await router.push(`/post/DetailPage/${postUrl}/${pid}`);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios({
        url: `http://127.0.0.1:8000/api/${postUrl}/${pid}/comments/`,
        method: "POST",
        data: { message: comment },
        headers,
      });
      await handleApply();
      await setState({ bottom: false });
      await router.push(`/post/DetailPage/${postUrl}/${pid}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper
      elevation={24}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
        background: "#F9F9F9",
      }}
    >
      <ApplyButton
        toggleDrawer={toggleDrawer}
        isLogInUserPost={isLogInUserPost}
        isApplyDisabled={isApplyDisabled}
        overApplyCruit={overApplyCruit}
      />

      <Drawer
        PaperProps={{ square: false }}
        anchor={"bottom"}
        open={state.bottom}
        onClose={toggleDrawer("bottom", false)}
      >
        <Typography
          textAlign="center"
          fontWeight={700}
          color="green"
          mt={1}
          variant="h5"
        >
          매치 신청
        </Typography>
        <Box
          role="presentation"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: 160,
            flexDirection: "column",
            ml: 6,
            mt: 5,
          }}
        >
          <Typography variant="h6" mb={4} fontWeight={700}>
            Q. {questionToApplyer}
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            method="POST"
            onSubmit={handleCommentSubmit}
            id="commentInput"
          >
            A.{" "}
            <TextField
              variant="filled"
              onChange={handleCommentInput}
              InputProps={{ disableUnderline: true }}
              sx={{ borderRadius: 8 }}
            />
          </Box>
        </Box>
        <Box ml={6} p={1}>
          <Typography variant="h6" fontWeight={600}>
            매치 신청 시 유의사항
          </Typography>
          <ul>
            <li>매치 신청 시 신청취소를 할 수 없습니다.</li>
            <li>신청 이후 채팅창이 자동으로 개설됩니다.</li>
            <li>신설된 채팅창에서 먼저 인사를 건네주시기 바랍니다.</li>
          </ul>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-evenly", my: 1.5 }}>
          <Button
            variant="contined"
            sx={{
              width: 100,
              height: 50,
              borderRadius: 8,
              border: "1px solid black",
            }}
            onClick={() => setState({ bottom: false })}
          >
            취소
          </Button>
          <Button
            color="green"
            variant="contained"
            type="submit"
            form="commentInput"
            sx={{ width: 100, height: 50, borderRadius: 8 }}
          >
            채팅 참여
          </Button>
        </Box>
      </Drawer>
    </Paper>
  );
}

export default ApplyBottomNavigation;

function ApplyButton({
  toggleDrawer,
  isLogInUserPost,
  isApplyDisabled,
  overApplyCruit,
}) {
  return (
    <Button
      variant="contained"
      color="green"
      size="large"
      sx={{ m: 3 }}
      onClick={toggleDrawer("bottom", true)}
      disabled={isLogInUserPost || isApplyDisabled || overApplyCruit}
    >
      {"신청하기"}
    </Button>
  );
}
