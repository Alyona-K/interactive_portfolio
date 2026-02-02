import { useState, useEffect } from "react";

export const useLoader = (duration: number = 1500) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isDone;
};
