import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
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
          icon={<AddCircleRoundedIcon color="green" fontSize="large" />}
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
