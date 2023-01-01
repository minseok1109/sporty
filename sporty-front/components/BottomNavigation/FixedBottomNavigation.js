import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Link from "next/link";
export default function FixedLogInBottomNavigation() {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
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
          label="post"
          component="a"
          LinkComponent={Link}
          href="/PostFormList"
          icon={<AddIcon />}
        />
        <BottomNavigationAction
          label="chat"
          component="a"
          LinkComponent={Link}
          href="#"
          icon={<ChatBubbleIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
