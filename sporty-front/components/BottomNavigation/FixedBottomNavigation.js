import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Link from "next/link";
export default function FixedLogInBottomNavigation() {
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
          label="Home"
          component="a"
          LinkComponent={Link}
          href="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label=""
          component="a"
          LinkComponent={Link}
          href="/PostFormList"
          icon={<AddCircleRoundedIcon color="primary" fontSize="large" />}
        />
        <BottomNavigationAction
          label="chat"
          component="a"
          LinkComponent={Link}
          href="chatting"
          icon={<ChatBubbleIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
