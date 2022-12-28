import { Typography, Box, Button, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
      {/* my page url 추가해야함 */}
      <Button href="#">
        <AccountCircleIcon color="action" fontSize="large" />
      </Button>
    </Box>
  );
}

export default Header;
