import { useRouter } from "next/router";
import { useEffect } from "react";
import userStore from "../../store";
import axios from "axios";
function logOut() {
  const router = useRouter();

  useEffect(() => {
    const t = axios.post("http://localhost:3000/api/logout").then((res) => res);
    console.log(t);
  }, []);

  useEffect(() => {
    router.push("/");
  }, [router]);
}

export default logOut;
