import { useState } from "react";
import styles from "./AppNav.module.css";

const typesOfTimer = [
  { id: 1, title: "pomodoro" },
  { id: 2, title: "short break" },
  { id: 3, title: "long break" },
];

function AppNav() {
  const [selectedType, setSelectedType] = useState(typesOfTimer.at(0).id);

  function handleClick(id) {
    setSelectedType(id);
  }

  return (
    <ul className={styles.list}>
      {typesOfTimer.map((item) => {
        return (
          <li
            key={item.id}
            className={`${styles.list__item} ${
              selectedType === item.id ? styles.list__itemActive : ""
            }`}
            onClick={() => handleClick(item.id)}
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
}

export default AppNav;
