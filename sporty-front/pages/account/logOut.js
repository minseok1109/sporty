import { useRouter } from "next/router";
import { useEffect } from "react";
import { deleteToken, useAppContext } from "../../store";

function logOut() {
  const { dispatch } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    dispatch(deleteToken());
  }, [dispatch]);

  useEffect(() => {
    router.push("/");
  }, [router]);
}

export default logOut;
