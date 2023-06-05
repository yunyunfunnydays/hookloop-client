import { useEffect, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const useTimer = (
  deadlineTimeSpan: number,
  setTimerTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  interval = SECOND,
) => {
  const [timespan, setTimespan] = useState(0);

  useEffect(() => {
    if (timespan === 0) {
      setTimerTrigger((pre) => !pre);
    }
    if (timespan > 0) {
      const intervalId = setInterval(() => {
        setTimespan((pre) => pre - interval);
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    }
    return () => {};
  }, [interval, setTimerTrigger, timespan]);

  useEffect(() => {
    setTimespan(deadlineTimeSpan);
  }, [deadlineTimeSpan]);

  return {
    minute:
      Math.floor(timespan / MINUTE) >= 10 ? `${Math.floor(timespan / MINUTE)}` : `0${Math.floor(timespan / MINUTE)}`,
    second:
      Math.floor((timespan / SECOND) % 60) >= 10
        ? `${Math.floor((timespan / SECOND) % 60)}`
        : `0${Math.floor((timespan / SECOND) % 60)}`,
  };
};
export default useTimer;
