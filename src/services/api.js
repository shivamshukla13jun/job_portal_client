import axios from "axios";
import { API_DEV, API_PROD } from "@/lib/config";
import { paths } from "./paths";

const request = axios.create({
    baseURL: API_PROD,
    withCredentials: true,
    // headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem("session")}`
    // }
});

request.interceptors.request.use((config) => {
    let token=new URLSearchParams(window.location.search).get("token")
    config.headers.Authorization = `Bearer ${sessionStorage.getItem("session") || token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

request.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 403) {
            window.location.href = paths.login;
        }
        return Promise.reject(error);
    }
);


const get = (url) => {
    return request.get(url);
};

const getById = (url, id) => {
    return request.get(`${url}/${id}`);
};

const post = (url, data) => {
    return request.post(url, data);
};

const put = (url, id, data) => {
    return request.put(`${url}/${id}`, data);
};

const putMultiForm = async (url, id, data) => {
    return request.putForm(`${url}/${id}`, data, {
        "Content-Type": "multipart/form-data",
    });
};

const del = (url, id) => {
    return request.delete(`${url}/${id}`);
};

export { get, getById, post, put, putMultiForm, del };