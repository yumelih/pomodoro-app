import { useTimer } from "../contexts/TimerContext";
import styles from "./SelectTime.module.css";
import { memo } from "react";

function time(type, limit) {
  return Array.from({ length: Number(limit) }, (_, index) => {
    return (
      <option value={index + 1} key={index + 1}>
        {index + 1} {type}
      </option>
    );
  });
}

const type = "min";
const limit = "480";

function SelectTime() {
  const { selectedMinutes, dispatch } = useTimer();

  console.log(selectedMinutes);

  return (
    <>
      <select
        value={selectedMinutes}
        onChange={(e) =>
          dispatch({ type: "timer/updateminutes", payload: e.target.value })
        }
        className={styles.changeTime}
      >
        {time(type, limit)}
      </select>
    </>
  );
}

export default memo(SelectTime);
