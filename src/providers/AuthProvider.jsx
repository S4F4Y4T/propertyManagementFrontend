import {createContext, useState, useEffect, useContext} from 'react';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const storedUserData = localStorage.getItem("userData");
    const storedTokenData = localStorage.getItem("tokenData");

    if (storedUserData && storedUserData !== "undefined") {
      setUserData(JSON.parse(storedUserData));
    }

    if (storedTokenData && storedTokenData !== "undefined") {
      setTokenData(JSON.parse(storedTokenData));
    }

    if (
      storedUserData && storedUserData !== "undefined" &&
      storedTokenData && storedTokenData !== "undefined"
    ) {
      setIsLoggedIn(true);
    }


    setLoading(false);
  }, []);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    if (tokenData) {
      localStorage.setItem('tokenData', JSON.stringify(tokenData));
    }
  }, [tokenData]);

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    tokenData,
    setTokenData,
    setLoading,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error('useAuth has to be used within <AuthContext>')
    }

    return authContext
}
