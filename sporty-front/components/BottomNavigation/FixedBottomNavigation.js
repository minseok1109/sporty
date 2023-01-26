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
        <Link href="/" legacyBehavior>
          <BottomNavigationAction
            label="매치"
            showLabel
            component="a"
            icon={<HomeOutlinedIcon />}
          />
        </Link>
        <Link href="/PostFormList" legacyBehavior>
          <BottomNavigationAction
            label=""
            component="a"
            showLabel
            icon={
              <AddCircleRoundedIcon
                color="green"
                sx={{ width: "48px", height: "48px" }}
              />
            }
          />
        </Link>
        <Link href="chatting" legacyBehavior>
          <BottomNavigationAction
            label="채팅"
            showLabel
            component="a"
            LinkComponent={Link}
            icon={<ChatBubbleIcon />}
          />
        </Link>
      </BottomNavigation>
    </Paper>
  );
}
