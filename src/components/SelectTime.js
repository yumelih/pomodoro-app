import styles from "./SelectTime.module.css";
import { memo, useState } from "react";

function time(type, limit) {
  return Array.from({ length: Number(limit) }, (_, index) => {
    return (
      <option value={index} key={index}>
        {index} {type}
      </option>
    );
  });
}

function SelectTime({ type, limit, setTime }) {
  const [selectedTime, setSelectedTime] = useState(0);

  function handleChange(e) {
    setTime(e.target.value);
    setSelectedTime(e.target.value);
  }

  //   console.log(selectedTime);

  return (
    <>
      <select
        value={selectedTime}
        onChange={handleChange}
        className={styles.changeTime}
      >
        {time(type, limit)}
      </select>
    </>
  );
}

export default memo(SelectTime);
