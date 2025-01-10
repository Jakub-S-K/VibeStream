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
        return <i className='bx bx-error'></i>;
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
      onClick={onClose}
    >
      {getIcon()}
      {message}
    </div>
  );
}

export default Message;
