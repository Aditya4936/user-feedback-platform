import apiClient from "../lib/axios";

export const loginApi = (data: { email: string; password: string }) =>
  apiClient.post("/auth/login", data);

export const signupApi = (data: {
  name: string;
  email: string;
  password: string;
}) => apiClient.post("/auth/signup", data);