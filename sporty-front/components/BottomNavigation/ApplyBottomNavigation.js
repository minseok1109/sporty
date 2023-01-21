import { Paper, Button } from "@mui/material";
import React from "react";
import { useAppContext } from "../../store";
import axios from "axios";
import { useRouter } from "next/router";

function ApplyBottomNavigation({ pid, postUrl, disabled }) {
  console.log(
    "🚀 ~ file: ApplyBottomNavigation.js:8 ~ ApplyBottomNavigation ~ disabled",
    disabled,
  );
  const {
    store: { jwtToken },
  } = useAppContext();
  const router = useRouter();
  const handleApply = async () => {
    const headers = { Authorization: `JWT ${jwtToken}` };
    const apiUrl = `http://127.0.0.1:8000/api/${postUrl}/${pid}/apply/`;
    const method = "POST";
    try {
      const response = await axios({
        url: apiUrl,
        method,
        headers,
      });
      await router.reload();
    } catch (error) {
      console.log("error: ", error);
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
        disabled={disabled}
      >
        신청하기
      </Button>
    </Paper>
  );
}

export default ApplyBottomNavigation;
