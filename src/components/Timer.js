import { useEffect, useState } from "react";
import styles from "./Timer.module.css";
import SelectTime from "./SelectTime";

function Timer({
  min,
  isRunning,
  onRunning,
  secondsRemaining,
  setSecondsRemaining,
  setMinutes,
}) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const [isClicked, setIsClicked] = useState(false);

  console.log(isRunning);
  function handleClick() {
    setIsClicked(true);
  }

  useEffect(
    function () {
      setSecondsRemaining(min * 60);
      setIsClicked(false);
    },
    [min, setSecondsRemaining]
  );

  useEffect(
    function () {
      if (secondsRemaining === 0) onRunning(false);

      if (isRunning && secondsRemaining > 0) {
        const interval = setInterval(() => {
          setSecondsRemaining((seconds) => seconds - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    },
    [secondsRemaining, isRunning, onRunning, setSecondsRemaining]
  );

  return (
    <div className={styles.container}>
      <div
        className={`${styles.timer} ${isRunning ? styles.timerDisabled : ""}}`}
        onClick={handleClick}
      >
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </div>
      {isClicked && <SelectTime type="min" limit="481" setTime={setMinutes} />}
    </div>
  );
}
export default Timer;
