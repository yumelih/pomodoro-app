import styles from "./Timer.module.css";
import SelectTime from "./SelectTime";
import { useTimer } from "../contexts/TimerContext";

function Timer() {
  const {
    selectedMinutes,
    secondsRemaining,
    isRunning,
    isDropdownOpen,
    dispatch,
  } = useTimer();
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  function handleClick() {
    dispatch({ type: "timer/selectminutes" });
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.timer} ${
          isRunning || selectedMinutes * 60 > secondsRemaining
            ? styles.timerDisable
            : ""
        }`}
        onClick={handleClick}
      >
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </div>
      {isDropdownOpen && <SelectTime />}
    </div>
  );
}
export default Timer;
