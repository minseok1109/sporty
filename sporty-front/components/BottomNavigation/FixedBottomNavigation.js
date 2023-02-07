import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Box,
  Drawer,
  Button,
  Typography,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import ClickAwayListener from "@mui/base/ClickAwayListener";

export default function FixedLogInBottomNavigation() {
  const router = useRouter();
  const [state, setState] = useState({
    bottom: false,
  });

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
      <BottomNavigation showLabels sx={{ alignItems: "center" }}>
        <Link href="/" legacyBehavior>
          <BottomNavigationAction
            label="매치"
            showLabel={true}
            component="a"
            icon={<HomeOutlinedIcon />}
          />
        </Link>
        <Box>
          <IconButton onClick={toggleDrawer("bottom", true)}>
            <AddCircleRoundedIcon
              color="green"
              sx={{ width: "48px", height: "48px" }}
            />
            <ClickAwayListener
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
              onClickAway={() => {
                setState({ bottom: false });
              }}
            >
              <Drawer
                PaperProps={{ square: false }}
                anchor={"bottom"}
                open={state.bottom}
                onClose={toggleDrawer("bottom", false)}
                // onOpen={toggleDrawer("bottom", true)}
              >
                <Typography
                  textAlign="center"
                  fontWeight={700}
                  color="green"
                  mt={1}
                >
                  매치 글쓰기
                </Typography>
                <Box
                  role="presentation"
                  onClick={toggleDrawer("bottom", false)}
                  onKeyDown={toggleDrawer("bottom", false)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: 50,
                  }}
                >
                  <Button
                    sx={{ height: 30, borderRadius: 8 }}
                    variant="outlined"
                    color="green"
                    onClick={() => router.push("/post/BasketPost")}
                  >
                    농구
                  </Button>
                  <Button
                    sx={{ height: 30, borderRadius: 8 }}
                    variant="outlined"
                    color="green"
                    onClick={() => router.push("/post/WalkPost")}
                  >
                    산책
                  </Button>
                  <Button
                    sx={{ height: 30, borderRadius: 8 }}
                    variant="outlined"
                    color="green"
                    onClick={() => router.push("/post/FreePost")}
                  >
                    자유
                  </Button>
                </Box>
              </Drawer>
            </ClickAwayListener>
          </IconButton>
        </Box>
        <Link href="chatting" legacyBehavior>
          <BottomNavigationAction
            label="채팅"
            showLabel={true}
            component="a"
            LinkComponent={Link}
            icon={<ChatBubbleIcon />}
          />
        </Link>
      </BottomNavigation>
    </Paper>
  );
}
