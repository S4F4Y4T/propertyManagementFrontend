import {useContext} from 'react';

import { createContext } from 'react';
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/providers/AuthProvider.jsx";
import useAxios from "../hooks/useAxios.jsx";

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {

  const {tokenData, setIsLoggedIn, setUserData, setTokenData} = useAuth();
  const {axiosUser} = useAxios();
  const navigate = useNavigate();

  const logoutRequest = async () => {
    if (tokenData?.accessToken?.token) {
      await axiosUser.post('/auth/logout', {
        refreshToken: tokenData.refreshToken?.token
      });
    }
  }

  const logout = async () => {
    if (tokenData?.accessToken?.token) {
      try {
        logoutRequest();

        // Update auth context states
        setIsLoggedIn(false);
        setUserData(null);
        setTokenData(null);

        // Clear local storage data
        localStorage.removeItem('userData');
        localStorage.removeItem('tokenData');

        // Navigate to the auth page
        navigate('/auth');

      } catch (error) {
        console.log(error);
        alert('An error occurred while logging out');
      }
    }
  }

  const contextValue = {
    logout
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
    const appContext = useContext(AppContext)

    if (!appContext) {
        throw new Error('useApp has to be used within <AppContext>')
    }

    return appContext
}

