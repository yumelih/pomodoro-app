import { useCallback } from "react";
import styles from "./TimeOptions.module.css";

function TimeOptions({ title, numOptions, selectedTime, onChange }) {
  const generateOptions = useCallback(
    function generateOptions() {
      const optionsArray = Array.from({ length: numOptions }, (_, i) => {
        return (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        );
      });
      return optionsArray;
    },
    [numOptions]
  );

  return (
    <div>
      <p className={styles.label}>{title}</p>
      <select
        value={selectedTime}
        onChange={(e) => onChange(e.target.value)}
        className={styles.customSelect}
      >
        {generateOptions()}
      </select>
    </div>
  );
}

export default TimeOptions;
