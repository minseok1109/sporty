import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NotLoginBottomNavigation() {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Home" href="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Log In"
          href="/account/login"
          icon={<AccountCircleIcon />}
        />
        <BottomNavigationAction
          label="Sign Up"
          href="/account/signUp"
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
