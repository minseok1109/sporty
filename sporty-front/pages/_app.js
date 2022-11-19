import React from "react";
import "../styles/globals.css";
import { AppProvider } from "../store";
import { Container, Box } from "@mui/material";

function MyApp({ Component, pageProps, ...appProps }) {
  return (
    <AppProvider>
      <Container>
        <Box display="flex" justifyContent="center" minHeight="100vh">
          <Component {...pageProps} />
        </Box>
      </Container>
    </AppProvider>
  );
}

export default MyApp;
