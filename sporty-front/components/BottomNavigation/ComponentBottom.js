import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../store";
import FixedLogInBottomNavigation from "./FixedBottomNavigation";
import NotLoginBottomNavigation from "./NotLoginBottomNavigation";
import ApplyBottomNavigation from "../BottomNavigation/ApplyBottomNavgation";
function ComponentBottom() {
  let [islogIn, setIsLogIn] = useState(false);
  const { store } = useAppContext();
  const router = useRouter();
  const isUploadProfilePage = router.pathname === "/UploadProfile";

  useEffect(() => {
    const { isAuthenticated } = store;
    setIsLogIn(isAuthenticated);
  }, [store]);

  if (isUploadProfilePage) {
    return <ApplyBottomNavigation />;
  }

  return islogIn ? (
    <FixedLogInBottomNavigation />
  ) : (
    <NotLoginBottomNavigation />
  );
}

export default ComponentBottom;
