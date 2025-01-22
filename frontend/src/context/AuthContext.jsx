import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (token && storedUser && !isTokenExpired(token)) {
        setUser(storedUser);
      } else {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }

      setIsLoading(false);
    }

    checkToken();
  }, []);

  const isTokenExpired = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    } catch (error) {
      setAlert('Invalid token', 'error');
      return true;
    }
  };

  const login = (userData) => {
    setUser(userData.user);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    setAlert('You have successfully logged in!', 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAlert('You have successfully logged out.', 'success');
    navigate('/');
  };

  return (
    !isLoading && (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
  );
};

export const useAuth = () => useContext(AuthContext);
