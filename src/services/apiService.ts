import axios from "axios";

const apiKey = "c98db5eb-b5f8-4ebc-8e8d-8281f7e6ec22";

export const apiClient = axios.create({
  baseURL: "https://fullstack.exercise.applifting.cz",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": apiKey,
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
