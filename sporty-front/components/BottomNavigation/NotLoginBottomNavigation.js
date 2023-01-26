import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

export default function NotLoginBottomNavigation() {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <Link href="/" legacyBehavior>
          <BottomNavigationAction
            component="a"
            label="홈"
            showLabel
            icon={<HomeIcon />}
          />
        </Link>
        <Link href="/account/login" legacyBehavior>
          <BottomNavigationAction
            component="a"
            label="로그인"
            showLabel
            icon={<AccountCircleIcon />}
          />
        </Link>
        <Link href="/account/signUp" legacyBehavior>
          <BottomNavigationAction
            component="a"
            label="회원가입"
            showLabel
            icon={<AccountCircleIcon />}
          />
        </Link>
      </BottomNavigation>
    </Paper>
  );
}
