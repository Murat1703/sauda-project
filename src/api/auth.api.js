import { http } from "./http.js";

export const apiLogin = (data) => http.post("/auth/otp/send", data);
export const apiVerify = (data) => http.post("/auth/otp/verify", data); 
export const apiProfile = (data) => http.post("/auth/profile", data); 
export const apiMe = () => http.get("/auth/me");
export const apiLogout = () => http.post("/auth/logout");
