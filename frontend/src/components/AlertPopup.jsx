import React from 'react';
import { useAlert } from '../context/AlertContext';

function AlertPopup() {
  const { text, type, closeAlert } = useAlert();

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <i className='bx bx-error-circle'></i>;
      case 'success':
        return <i className='bx bx-check'></i>;
      default:
        return null;
    }
  };

  return (
    <>
      {text && type && (
        <div className={`message message--${type}`}>
          <div className='message__text'>
            {getIcon()}
            {text}
          </div>
          <div className='message__cross' onClick={closeAlert}>
            <i class='bx bx-x'></i>
          </div>
        </div>
      )}
    </>
  );
}

export default AlertPopup;
