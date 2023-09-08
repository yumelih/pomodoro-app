import { useState } from "react";
import styles from "./AppNav.module.css";

const typesOfTimer = ["pomodoro", "short break", "long break"];

function AppNav() {
  const [selectedType, setSelectedType] = useState(typesOfTimer.at(0));

  function handleClick(item) {
    setSelectedType(item);
  }

  return (
    <ul className={styles.list}>
      {typesOfTimer.map((item) => {
        return (
          <li
            key={item}
            className={`${styles.list__item} ${
              selectedType === item ? styles.list__itemActive : ""
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
