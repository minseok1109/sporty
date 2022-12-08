import React from "react";
import "../styles/globals.css";
import { AppProvider } from "../store";
import { Container, Box } from "@mui/material";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps, ...appProps }) {
  return (
    <AppProvider>
      <SnackbarProvider>
        <Container>
          <Box
            display="flex"
            justifyContent="center"
            minHeight="100vh"
            flexDirection="column"
          >
            <Component {...pageProps} />
          </Box>
        </Container>
      </SnackbarProvider>
    </AppProvider>
  );
}

export default MyApp;
