import React, { useState, useEffect, useRef } from 'react';

function Message({ type, message, onClose }) {
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, 4000);
    }

    return () => clearTimeout(timerRef.current);
  }, [message, onClose, isHovered]);

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
    <div
      className={`message message--${type}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='message__text'>
        {getIcon()}
        {message}
      </div>
      <div className='message__cross' onClick={onClose}>
        <i class='bx bx-x'></i>
      </div>
    </div>
  );
}

export default Message;
