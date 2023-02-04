import { useRouter } from "next/router";
import React from "react";
import FixedLogInBottomNavigation from "./FixedBottomNavigation";
import NotLoginBottomNavigation from "./NotLoginBottomNavigation";
// import userStore from "../../store";
function ComponentBottom() {
  const router = useRouter();
  const isLoggedIn = userStore.getState().isLoggedIn;
  const isUploadProfilePage = router.pathname === "/UploadProfile";
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
