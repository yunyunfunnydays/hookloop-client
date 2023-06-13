import { Space, Typography } from "antd";
import React, { useEffect, useState } from "react";

export interface TimerProps {
  setTimerTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}
const SECOND = 1000;
const MINUTE = SECOND * 60;
const Timer = (props: TimerProps) => {
  const { setTimerTrigger } = props;
  const [timespan, setTimespan] = useState(600000);

  useEffect(() => {
    if (timespan === 0) {
      setTimerTrigger(false);
    }
    if (timespan > 0) {
      const intervalId = setInterval(() => {
        setTimespan((pre) => pre - 1000);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
    return () => {};
  }, [setTimerTrigger, timespan]);

  return (
    <Typography.Text type="danger">
      <Space>
        {Math.floor(timespan / MINUTE) >= 10 ? `${Math.floor(timespan / MINUTE)}` : `0${Math.floor(timespan / MINUTE)}`}
        :
        {Math.floor((timespan / SECOND) % 60) >= 10
          ? `${Math.floor((timespan / SECOND) % 60)}`
          : `0${Math.floor((timespan / SECOND) % 60)}`}
      </Space>
    </Typography.Text>
  );
};
export default Timer;
