import React from "react";
import "../styles/globals.css";
import { AppProvider } from "../store";
import { Button, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import { theme } from "../palette";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import ComponentBottom from "../components/BottomNavigation/ComponentBottom";
import { UserProvieder } from "../userStore";

function MyApp({ Component, pageProps, ...appProps }) {
  const router = useRouter();
  let headerProps = {};
  let notShowHeader = [
    "/account/login",
    "/account/signUp",
    "/PostFormList",
    "/account/MyPage",
    "/post/DetailPage/[postUrl]/[pid]",
    "/UploadProfile",
  ];
  let isShowHeader = notShowHeader.includes(router.pathname);

  let needConPadding = [
    "/post/BasketPost",
    "/post/FreePost",
    "/post/WalkPost",
    "/account/MyPage",
  ];
  let needContainerPadding = needConPadding.includes(router.pathname);

  if (router.pathname === "/") {
    headerProps = {
      title: "SPORTY",
    };
  }
  if (
    router.pathname.startsWith("/post/") &&
    router.pathname.endsWith("Post")
  ) {
    headerProps = {
      title: "매치 글쓰기",
      prev: (
        <Button onClick={() => router.back()} color="white">
          X
        </Button>
      ),
      finish: (
        <Button
          type="submit"
          form="postForm"
          color="white"
          sx={{ fontSize: "16px" }}
        >
          완료
        </Button>
      ),
    };
  }

  return (
    <CssBaseline>
      <AppProvider>
        <UserProvieder>
          <SnackbarProvider>
            <ThemeProvider theme={theme}>
              {!isShowHeader && <Header {...headerProps} />}
              <Container
                disableGutters={!needContainerPadding}
                sx={{ maxHeight: 1, pb: "60px" }}
              >
                <Component {...pageProps} />
                <ComponentBottom />
              </Container>
            </ThemeProvider>
          </SnackbarProvider>
        </UserProvieder>
      </AppProvider>
    </CssBaseline>
  );
}

export default MyApp;
