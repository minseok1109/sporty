import React from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
// import "normalize.css/normalize.css";

function MyApp({ Component, pageProps, ...appProps }) {
  // 로그인, 회원가입 페이지에서 헤더가 안보이게
  const is_login_signup = [`/account/signUp`, `/account/login`].includes(
    appProps.router.pathname
  );

  const is_artticle_getPeople = [`/article`, `/getPeople`].includes(
    appProps.router.pathname
  );

  const HeaderComponent = is_login_signup ? React.Fragment : Navbar;
  const FooterComponent = is_login_signup ? React.Fragment : Footer;
  const SearchBarComponent = is_artticle_getPeople ? SearchBar : React.Fragment;
  return (
    <>
      <HeaderComponent />
      <SearchBarComponent />
      <Component {...pageProps} />
      <FooterComponent />
    </>
  );
}

export default MyApp;
