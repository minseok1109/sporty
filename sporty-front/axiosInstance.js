import axios from "axios";
import { makeUseAxios } from "axios-hooks";

export const backend_api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_API_URL
      : "http://127.0.0.1:8000",
});

export const useAxios = makeUseAxios({
  axios: backend_api,
});
