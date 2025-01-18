import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAlert } from '../context/AlertContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setAlert } = useAlert();
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser({ id: userData.user.id, username: userData.user.nickname });
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    setAlert('You have successfully logged in!', 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAlert('You have successfully logged out.', 'success');
  };

  const isTokenExpired = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  };

  useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (token && !isTokenExpired(token)) {
        // const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: user.id, username: user.nickname });
      }
    }

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
