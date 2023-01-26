import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStoreState } from "../../store";
import FixedLogInBottomNavigation from "./FixedBottomNavigation";
import NotLoginBottomNavigation from "./NotLoginBottomNavigation";
function ComponentBottom() {
  const router = useRouter();
  let [islogIn, setIsLogIn] = useState(false);
  const store = useStoreState();
  const isUploadProfilePage = router.pathname === "/UploadProfile";
  const isDetailPage = router.pathname === "/post/DetailPage/[postUrl]/[pid]";
  useEffect(() => {
    const { isAuthenticated } = store;
    setIsLogIn(isAuthenticated);
  }, [store]);

  if (islogIn) {
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
