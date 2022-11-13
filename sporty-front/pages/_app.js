import React from "react";
import "../styles/globals.css";
import { AppProvider } from "../store";
import { Container } from "@mui/material";

function MyApp({ Component, pageProps, ...appProps }) {
  return (
    <AppProvider>
      <Container maxWidth="xl">
        <Component {...pageProps} />
      </Container>
    </AppProvider>
  );
}

export default MyApp;
