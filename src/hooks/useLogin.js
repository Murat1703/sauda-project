import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { apiLogin, apiProfile, apiVerify } from "../api/auth.api.js";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useAuth } from "../context/AuthContext.jsx";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [status, setStatus] = useState(null);

  const { fetchUser, setUser, user } = useAuth();

  const login = async (phone) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        phone: phone,
        purpose: "login",
      };


      const res = await apiLogin(payload);
      setStatus(res?.data)
    //   await fetchUser();
      return res.data

    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(null)

  const verify = async (phone, code)=>{
    try {
      setVerifyLoading(true);
      setVerifyError("");
      const payload = {
        phone: phone,
        code: code,
        purpose: "login",
      };
      const res = await apiVerify(payload);
      localStorage.setItem("token", res.data.access_token);
      await fetchUser();

      setVerifyStatus(res.data)
      if (user) {
        setUser(user);
      } else {
        await fetchUser();
      }
      if (res?.data.message)
      {
        setVerifyError(res.data.message); 
      }
      // console.log('VERIFY:', res.data);
      // console.log('VERIFY USER:', res.data?.user);
      return res.data
      } catch (err) {
        setVerifyError(err?.response?.data.message || err.message);
      } finally {
        setVerifyLoading(false);
      }
  }

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const [profileStatus, setProfileStatus] = useState(false);

  const profile = async (name)=>{
    try {
      setProfileLoading(true);
      setProfileError("");

      const data = {
        profile_type: "individual",
        name: name,
        iin: "990101300000",
      };


      const res = await apiProfile(data);
      await fetchUser();

      setProfileStatus(res.data)
      return res.data

    } catch (err) {
      setUser(null);
      setProfileError(err?.response?.data.message|| err.message);
    } finally {
      setProfileLoading(false);
    }
  }

  const clearError = () =>{
    setVerifyError("")
  }

  return {
    login,
    status,
    loading,
    error,
    setError,

    verify,
    verifyError,
    clearError,
    verifyLoading, 
    verifyStatus,

    profile,
    profileLoading,
    profileStatus, 
    profileError
  };
};