import { useRef, useEffect } from "react";

export const useTimer = (callback, interval) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let intervalId = setInterval(tick, interval);
    return () => clearInterval(intervalId);
  }, [interval]);
};
