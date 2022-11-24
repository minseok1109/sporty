import Axios from "axios";
import { makeUseAxios } from "axios-hooks";


export const axiosInstance = Axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export const useAxios = makeUseAxios({
    axios: axiosInstance
});