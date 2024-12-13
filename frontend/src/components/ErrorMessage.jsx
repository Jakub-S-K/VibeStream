import React, { useState, useEffect, useRef } from 'react';

function ErrorMessage({ message, onClose }) {
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

  return (
    <div
      className='error-message'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClose}
    >
      <i class='bx bx-error'></i>
      {message}
    </div>
  );
}

export default ErrorMessage;
