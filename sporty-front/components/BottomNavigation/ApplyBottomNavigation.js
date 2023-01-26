import { Paper, Button } from "@mui/material";
import React from "react";
import { useStoreState } from "../../store";
import axios from "axios";
import { useRouter } from "next/router";

function ApplyBottomNavigation({
  pid,
  postUrl,
  isApplyDisabled,
  isLogInUserPost,
}) {
  const store = useStoreState();
  const { jwtToken } = store;
  const router = useRouter();
  const handleApply = async () => {
    const headers = { Authorization: `JWT ${jwtToken}` };
    const apiUrl = `http://127.0.0.1:8000/api/${postUrl}/${pid}/apply/`;
    const method = isApplyDisabled ? "DELETE" : "POST";

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
  return (
    <Paper
      elevation={24}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
      }}
    >
      <Button
        variant="contained"
        color="green"
        size="large"
        sx={{ m: 3 }}
        onClick={() => handleApply()}
        disabled={isLogInUserPost}
      >
        {isApplyDisabled ? "취소하기" : "신청하기"}
      </Button>
    </Paper>
  );
}

export default ApplyBottomNavigation;
