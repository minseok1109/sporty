import { Typography, Box, Button, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

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
      <Button href="BasketPost">
        <AddIcon />
      </Button>
    </Box>
  );
}

export default Header;
