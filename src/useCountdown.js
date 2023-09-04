import { useEffect, useState } from "react";

function useCountdown(targetDate) {
  const countdownTargetDate = new Date(targetDate).getTime();
  const [countdown, setCountdown] = useState(
    countdownTargetDate - new Date().getTime()
  );

  useEffect(
    function () {
      const interval = setInterval(() => {
        setCountdown(countdownTargetDate - new Date().getTime());
      }, 1000);

      return function () {
        clearInterval(interval);
      };
    },
    [countdownTargetDate]
  );

  return getReturnInMinutesSeconds(countdown);
}

function getReturnInMinutesSeconds(countdown) {
  const oneSecond = 1000;
  const oneMinute = 1000 * 60;

  const minutes = Math.floor(countdown / oneMinute);
  const seconds = Math.floor((countdown % oneMinute) / oneSecond);

  return [minutes, seconds];
}

export { useCountdown };
