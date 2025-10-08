// src/hooks/useAxios.js
import { useMemo } from "react";
import axios from "axios";
import { useAuth } from "@/providers/AuthProvider.jsx";

const useAxios = () => {
  const { tokenData, setIsLoggedIn, setUserData, setTokenData } = useAuth();

  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

    /* ──────  PUBLIC INSTANCE  ────── */
  const axiosPublic = useMemo(() => axios.create({ baseURL }), []);

  /* ──────  PROTECTED USER INSTANCE  ────── */
  const axiosUser = useMemo(() => {
    const instance = axios.create({ baseURL });

    /* -----  REQUEST: add bearer  ----- */
    instance.interceptors.request.use(
      (config) => {
        const accessToken = tokenData?.accessToken?.token;

        if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    /* -----  RESPONSE: handle errors  ----- */
    instance.interceptors.response.use(
      (response) => response,

      async (error) => {
        
        if (
            error.response &&
            error.response.status === 401
        ) {
            logoutUser()
        }

        return Promise.reject(error);

      }
    );

    /* -----  Helper: centralised logout  ----- */
    const logoutUser = () => {
      setIsLoggedIn(false);
      setUserData(null);
      setTokenData(null);
      localStorage.removeItem("userData");
      localStorage.removeItem("tokenData");
    };

    return instance;
  }, [tokenData, setIsLoggedIn, setUserData, setTokenData, axiosPublic]);

  return { axiosPublic, axiosUser };
};

export default useAxios;
