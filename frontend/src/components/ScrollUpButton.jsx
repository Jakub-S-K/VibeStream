import React, { useEffect, useState } from 'react';

function ScrollUpButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`scrollup ${isVisible ? 'show-scroll' : ''}`}
      onClick={scrollToTop}
    >
      <i class="bx bx-up-arrow-alt"></i>
    </button>
  );
}

export default ScrollUpButton;
