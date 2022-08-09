import React from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import "../styles/reset.css";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps, ...appProps }) {
  // 로그인, 회원가입 페이지에서 헤더가 안보이게
  const is_login_signup = [`/account/signUp`, `/account/login`].includes(
    appProps.router.pathname
  );
  const HeaderComponent = is_login_signup ? React.Fragment : Navbar;
  const FooterComponent = is_login_signup ? React.Fragment : Footer;
  return (
    <>
      <HeaderComponent />
      <Component {...pageProps} />
      <FooterComponent />
    </>
  );
}

export default MyApp;
