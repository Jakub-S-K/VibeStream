import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('info');

  const setMessageWithType = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
  };

  return (
    <MessageContext.Provider
      value={{ message, messageType, setMessage: setMessageWithType }}
    >
      {children}
    </MessageContext.Provider>
  );
};
