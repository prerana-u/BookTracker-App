import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        return jwtDecode(storedToken);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Login: Save token + decode user info
  const login = (jwtToken) => {
    console.log("Login called with token:", jwtToken);
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setUser(jwtDecode(jwtToken));
  };

  // Logout: Remove token and user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
