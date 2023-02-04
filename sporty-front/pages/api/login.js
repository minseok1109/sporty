import axios from "axios";
import { setCookie } from "nookies";
import userStore from "../../store";

export default async function handler(req, res) {
  try {
    const { username, password } = await req.body;
    const data = await { username, password };
    const response = await axios.post(
      "http://127.0.0.1:8000/accounts/token/",
      data,
    );
    const { refresh, access } = await response.data;
    await setCookie({ res }, "refresh", refresh, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    await setCookie({ res }, "access", access, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    await userStore.getState().setAccessToken(access);
    await setCookie({ res }, "isAuthenticated", true, {
      path: "/",
    });
    await res.send(userStore.getState().accessToken);
  } catch (error) {
    await res.status(400, "cookie error");
    await res.send();
    console.log(error);
  }
}
