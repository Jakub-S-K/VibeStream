import { createContext, useContext, useEffect, useState } from 'react';

const ALERT_TIME = 5000;
const initialState = {
  text: '',
  type: '',
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('');

  const setAlert = (text, type) => {
    setText(text);
    setType(type);
  };

  const closeAlert = () => {
    setText('');
    setType('');
  };

  useEffect(() => {
    if (!text) return;

    const timer = setTimeout(() => {
      closeAlert();
    }, ALERT_TIME);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <AlertContext.Provider value={{ text, type, setAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
