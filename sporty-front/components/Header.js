import { Typography, Box, Button, Link, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
function Header(props) {
  const theme = useTheme();

  if (props) {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.header,
          display: " flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          padding: 3,
          borderRadius: "0px 0px 30px 30px",
        }}
      >
        {props?.prev}
        <Link href="/" underline="none" color="black">
          <Typography fontSize={30} color="#ffff">
            {props?.title}
          </Typography>
        </Link>
        {props?.finish}
        {props.title === "SPORTY" && (
          <Button href="/account/MyPage">
            <AccountCircleOutlinedIcon color="disabled" fontSize="large" />
          </Button>
        )}
      </Box>
    );
  }
}

export default Header;
