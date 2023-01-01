import { Typography, Box, Button, Link, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Header() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.header,
        display: " flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: 1,
        padding: 3,
      }}
    >
      <Link href="/" underline="none" color="black">
        <Typography fontSize={30}>SPORTy</Typography>
      </Link>
      {/* my page url 추가해야함  유저정보도 가져와야함*/}
      <Button href="#">
        <Avatar />
      </Button>
    </Box>
  );
}

export default Header;
