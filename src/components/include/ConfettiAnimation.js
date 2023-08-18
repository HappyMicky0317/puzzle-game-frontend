import { useEffect } from "react";
import confetti from "canvas-confetti";

const ConfettiAnimation = () => {
  useEffect(() => {
    const duration = 60 * 100;
    const animationEnd = Date.now() + duration;

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);

      const confettiOptions1 = {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      };
      const confettiOptions2 = {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      };

      confetti(confettiOptions1);
      confetti(confettiOptions2);
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default ConfettiAnimation;
