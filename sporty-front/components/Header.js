import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";
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
        {props?.prev && props?.prev}
        {props.href ? (
          <Link href={props?.href} underline="none" color="black">
            <Typography fontSize={30} color="#ffff" fontWeight={600}>
              {props?.title}
            </Typography>
          </Link>
        ) : (
          <Typography fontSize={30} color="#ffff" fontWeight={600}>
            {props?.title}
          </Typography>
        )}
        {props?.finish}
        {props.title === "SPORTY" && (
          <Link href="/account/MyPage" legacyBehavior>
            <a>
              <AccountCircleOutlinedIcon color="disabled" fontSize="large" />
            </a>
          </Link>
        )}
      </Box>
    );
  }
}

export default Header;
