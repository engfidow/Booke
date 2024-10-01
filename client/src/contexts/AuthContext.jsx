import React, { createContext, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);
  const [user, setUser] = useState(cookies.auth_token ? { email: 'user@example.com' } : null);

  const login = (token) => {
    setCookie('auth_token', token, { path: '/', maxAge: 3600 });
    setUser({ email: 'user@example.com' });
  };

  const logout = () => {
    removeCookie('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
