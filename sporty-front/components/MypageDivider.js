import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import NextLink from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function TemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["로그인", "회원가입"].map((text, index) => (
          <ListItem key={text} disablePadding>
            {index === 0 ? (
              <NextLink href="/account/login" passHref legacyBehavior>
                <ListItemButton component="a">
                  <span>{text}</span>
                </ListItemButton>
              </NextLink>
            ) : (
              <NextLink href="/account/signUp" passHref legacyBehavior>
                <ListItemButton component="a">
                  <span>{text}</span>
                </ListItemButton>
              </NextLink>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer("right", true)}>
          <AccountCircleIcon />
        </Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default TemporaryDrawer;
