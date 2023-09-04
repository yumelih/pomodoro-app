import styles from "./StartPauseTimer.module.css";

function StartPauseTimer({ isRunning, onRunning }) {
  function handleClick() {
    onRunning((prev) => !prev);
  }

  return (
    <button className={styles.btn} onClick={handleClick}>
      {isRunning ? "Pause" : "Start"}
    </button>
  );
}
export default StartPauseTimer;
