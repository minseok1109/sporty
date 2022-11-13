import { useEffect, useState } from "react";
import {
  Paper,
  Avatar,
  Box,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import { blue } from "@mui/material/colors";

function Profile() {
  let [userData, setUserData] = useState({});
  let [showProfile, setShowProfile] = useState(true);

  useEffect(() => {
    const getUserData = () => {
      fetch("https://jsonplaceholder.typicode.com/users/1")
        .then((response) => response.json())
        .then((json) => setUserData(json))
        .then(setShowProfile(false));
    };
    getUserData();
  }, []);
  let { username, email } = userData;
  // console.log(username, email, school);
  return (
    <Paper sx={{ maxWidth: 768, minWidth: 320, border: 1, my: 3 }}>
      <Avatar
        variant="outlined"
        elevation="3"
        sx={{
          bgcolor: blue[500],
          margin: 2,
          width: 56,
          height: 56,
          position: "absolute",
        }}
      >
        S
      </Avatar>
      <Box component="div" sx={{ position: "relative", left: 100 }}>
        {showProfile && <CircularProgress />}
        {showProfile && <Typography>아이디: {email}</Typography>}
        <Typography>닉네임 : {username}</Typography>
        <Typography>학교 : </Typography>
      </Box>
      <Box sx={{ position: "relative", left: 100, my: 2 }}>
        <Link href="#" underline="none" sx={{ mr: 3 }}>
          내가 쓴 글
        </Link>
        <Link href="#" underline="none">
          신청한 글
        </Link>
      </Box>
    </Paper>
  );
}

export default Profile;
