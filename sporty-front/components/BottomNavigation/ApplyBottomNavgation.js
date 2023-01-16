import { BottomNavigation, Button, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function ApplyBottomNavgation() {
  const router = useRouter();
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        pb: 2,
      }}
      // elevation={3}
    >
      <BottomNavigation sx={{ justifyContent: "space-evenly" }}>
        <Button
          variant="contained"
          color="gray"
          sx={{ borderRadius: 8, width: 120 }}
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          type="sumit"
          form="nickname_edit"
          variant="contained"
          color="green"
          sx={{ borderRadius: 8, width: 120 }}
        >
          완료
        </Button>
      </BottomNavigation>
    </Paper>
  );
}

export default ApplyBottomNavgation;
