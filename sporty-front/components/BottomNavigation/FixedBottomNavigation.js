import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
export default function FixedLogInBottomNavigation() {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Home" href="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="post"
          href="/post/BasketPost"
          icon={<AddIcon />}
        />
        <BottomNavigationAction
          label="chat"
          href="#"
          icon={<ChatBubbleIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
