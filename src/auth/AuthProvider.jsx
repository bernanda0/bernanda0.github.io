import React, { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["userID"]);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const clearAllCookies = async () => {
    Object.keys(cookies).forEach((cookieName) => {
      removeCookie(cookieName);
    });
  };

  const login = async (data) => {
    setCookie("userID", data);
  };

  useEffect(() => {
    const storedUserID = cookies.userID;

    if (storedUserID) {
      setUser(storedUserID);
      if (storedUserID === import.meta.env.VITE_ADMIN_ID) {
        setIsAdmin(true);
      } else {
        login("guest");
        setIsAdmin(false);
      }
    }
  }, [cookies]);

  const value = useMemo(
    () => ({
      isAdmin,
      user,
      login,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
