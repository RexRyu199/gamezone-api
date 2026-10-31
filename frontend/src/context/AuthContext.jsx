import React, { useState, useEffect, createContext } from "react";
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks/useUser";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(undefined);
  const { getMe } = useUser();

  const login = async (token) => {
    const me = await getMe(token); 
    setToken(token);
    setAuth({ token, me });
  };

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
      return;
    }
    login(token).catch(() => {
      removeToken(); 
      setAuth(null);
    });
  }, []);

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}