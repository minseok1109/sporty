import { useRouter } from "next/router";
import { deleteToken, useAppContext } from "../../store";
import { useEffect } from "react";
function logOut() {
  const { store, dispatch } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    dispatch(deleteToken());
  }, []);

  useEffect(() => {
    router.push("/");
  }, [store]);
  return <></>;
}

export default logOut;
