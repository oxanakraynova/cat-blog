import axios from "axios";

const apiKey = "c98db5eb-b5f8-4ebc-8e8d-8281f7e6ec22";
const bearerToken = "Bearer 17ffeeee-82c9-4aed-a6ca-e4155c28ae6d";

export const apiClient = axios.create({
  baseURL: "https://fullstack.exercise.applifting.cz",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": apiKey,
    Authorization: bearerToken,
  },
});
