import React from "react";
import "../styles/globals.css";
import { AppProvider } from "../store";
import { CssBaseline } from "@mui/material";
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
  let notShowHeader = [
    "/account/login",
    "/account/signUp",
    "/PostFormList",
    "/account/MyPage",
  ];
  let showHeader = notShowHeader.includes(router.pathname);

  let needConPadding = [
    "/post/BasketPost",
    "/post/FreePost",
    "/post/WalkPost",
    "/account/MyPage",
  ];
  let needContainerPadding = needConPadding.includes(router.pathname);

  return (
    <CssBaseline>
      <AppProvider>
        <UserProvieder>
          <SnackbarProvider>
            <ThemeProvider theme={theme}>
              {!showHeader && <Header />}
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
