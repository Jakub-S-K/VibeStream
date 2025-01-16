import React, { createContext, useState, useContext, useEffect } from 'react';
import Message from '../components/Message';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData.user.id);
    console.log(user);
    localStorage.setItem('token', userData.token);
    setSuccess('You have successfully logged in!');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setSuccess('You have successfully logged out.');
  };

  const isTokenExpired = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  };

  const closeSuccess = () => {
    setSuccess(null);
  };

  useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem('token');

      if (token && !isTokenExpired(token)) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload.id);
      }
    }

    checkToken();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {success && (
        <Message
          type='success'
          message={success}
          onClose={closeSuccess}
        ></Message>
      )}

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
