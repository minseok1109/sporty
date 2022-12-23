import React, { useEffect, useState } from "react";
import { useAppContext } from "../../store";
import FixedLogInBottomNavigation from "./FixedBottomNavigation";
import NotLoginBottomNavigation from "./NotLoginBottomNavigation";

function ComponentBottom() {
  let [islogIn, setIsLogIn] = useState(false);
  const { store } = useAppContext();

  useEffect(() => {
    const { isAuthenticated } = store;
    setIsLogIn(isAuthenticated);
  }, [store]);

  return islogIn ? (
    <FixedLogInBottomNavigation />
  ) : (
    <NotLoginBottomNavigation />
  );
}

export default ComponentBottom;
