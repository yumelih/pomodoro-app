import styles from "./AppNav.module.css";
import { useTimer } from "../contexts/TimerContext";

const typesOfTimer = ["pomodoro", "short break", "long break"];

function AppNav() {
  const { secondsRemaining, selectedMinutes, isRunning, phase, dispatch } =
    useTimer();

  function handleClick(item) {
    if (isRunning || secondsRemaining < selectedMinutes * 60) return;
    dispatch({ type: "timer/selectphase", payload: item });
  }

  return (
    <ul className={styles.list}>
      {typesOfTimer.map((item) => {
        return (
          <li
            key={item}
            className={`${styles.list__item} ${
              phase === item ? styles.list__itemActive : ""
            }`}
            onClick={() => handleClick(item)}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default AppNav;
