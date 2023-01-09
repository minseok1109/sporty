import React from "react";

function ApplyBottomNavgation() {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      // elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="매치"
          component="a"
          LinkComponent={Link}
          href="/"
          icon={<HomeOutlinedIcon />}
        />
        <BottomNavigationAction
          label=""
          component="a"
          LinkComponent={Link}
          href="/PostFormList"
          icon={<AddCircleRoundedIcon color="primary" fontSize="large" />}
        />
        <BottomNavigationAction
          label="채팅"
          component="a"
          LinkComponent={Link}
          href="chatting"
          icon={<ChatBubbleIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default ApplyBottomNavgation;
