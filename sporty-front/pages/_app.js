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

function MyApp({ Component, pageProps, ...appProps }) {
  const router = useRouter();
  let notShowHeader = ["/account/login", "/BasketPost", "/account/signUp"];
  let showHeader = notShowHeader.includes(router.pathname) ? false : true;
  return (
    <CssBaseline>
      <AppProvider>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <Container disableGutters={true} sx={{ maxHeight: 1 }}>
              {showHeader && <Header />}
              <Component {...pageProps} />
              <ComponentBottom />
            </Container>
          </ThemeProvider>
        </SnackbarProvider>
      </AppProvider>
    </CssBaseline>
  );
}

export default MyApp;
