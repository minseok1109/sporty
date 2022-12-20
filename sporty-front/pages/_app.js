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

function MyApp({ Component, pageProps, ...appProps }) {
  const router = useRouter();
  let notShowHeader = ["/account/login", "/BasketPost"];
  let showHeader = notShowHeader.includes(router.pathname) ? false : true;
  return (
    <CssBaseline>
      <AppProvider>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <Container>
              {showHeader && <Header />}
              <Component {...pageProps} />
            </Container>
          </ThemeProvider>
        </SnackbarProvider>
      </AppProvider>
    </CssBaseline>
  );
}

export default MyApp;
