import React, { useState, useEffect } from 'react';

const useCountdown = (initialTime) => {
    const [countdown, setCountdown] = useState(initialTime);
  
    useEffect(() => {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
  
        return () => clearTimeout(timer);
      }
    }, [countdown]);
  
    return countdown;
};

export default useCountdown;