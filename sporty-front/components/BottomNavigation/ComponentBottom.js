import { useRouter } from "next/router";
import React from "react";
import FixedLogInBottomNavigation from "./FixedBottomNavigation";
import NotLoginBottomNavigation from "./NotLoginBottomNavigation";
function ComponentBottom({ isLoggedIn }) {
  const router = useRouter();
  const isDetailPage = router.pathname === "/post/DetailPage/[postUrl]/[pid]";

  if (isLoggedIn) {
    if (isDetailPage) {
      return <></>;
    } else {
      return <FixedLogInBottomNavigation />;
    }
  } else {
    return <NotLoginBottomNavigation />;
  }
}

export default ComponentBottom;
