import { useRouter } from "next/router";
import { useEffect } from "react";
import { deleteToken, useAppContext } from "../../store";
import { useUserDispatch } from "../../userStore";

function logOut() {
  const { dispatch } = useAppContext();
  const router = useRouter();
  const UserDispatch = useUserDispatch();

  useEffect(() => {
    dispatch(deleteToken());
    UserDispatch({ type: "LOG_OUT" });
  }, [dispatch, UserDispatch]);

  useEffect(() => {
    router.push("/");
  }, [router]);
}

export default logOut;
