import { useTimer } from "../contexts/TimerContext";
import styles from "./StartPauseTimer.module.css";

function StartPauseTimer() {
  const { isRunning, dispatch } = useTimer();

  function handleClick() {
    isRunning
      ? dispatch({ type: "timer/pause" })
      : dispatch({ type: "timer/start" });
  }

  return (
    <button className={styles.btn} onClick={handleClick}>
      {isRunning ? "Pause" : "Start"}
    </button>
  );
}
export default StartPauseTimer;
