import axios from "axios";

export const axiosApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 5000,
    headers: {
        'Content-Type': `application/json;charset=utf-8`
    },
    withCredentials: true
});
