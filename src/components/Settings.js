import { useState } from "react";
import styles from "./Settings.module.css";
import TimeOptions from "./TimeOptions";
import { useTimer } from "../contexts/TimerContext";

const colorIds = ["red", "blue", "purple"];
const colorClassName = "modal__color";

const fontIds = ["sans-serif", "serif", "system-ui"];
const fontClassName = "modal__font";

function Settings({ onSettingsOpen }) {
  const { userSelected, dispatch } = useTimer();
  const { time, color, font } = userSelected;

  const [selectedPomodoro, setSelectedPomodoro] = useState(time.pomodoroTime);
  const [selectedShort, setSelectedShort] = useState(time.shortBreakTime);
  const [selectedLong, setSelectedLong] = useState(time.longBreakTime);

  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedFont, setSelectedFont] = useState(font);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "timer/settingschange",
      payload: {
        time: {
          pomodoroTime: selectedPomodoro,
          shortBreakTime: selectedShort,
          longBreakTime: selectedLong,
        },
        color: selectedColor,
        font: selectedFont,
      },
    });

    onSettingsOpen(false);
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__backdrop}></div>
      <div className={styles.modal__main}>
        <div className={styles.modal__titleContainer}>
          <h1 className={styles.modal__h1}>Settings</h1>
          <p
            className={styles.modal__close}
            onClick={() => onSettingsOpen(false)}
          >
            &times;
          </p>
        </div>
        <form className={styles.content} onSubmit={handleSubmit}>
          <div className={styles.modal__time}>
            <h3 className={`${styles.modal__h3} ${styles.modal__timeTitle}`}>
              TIME (MINUTES)
            </h3>
            <TimeOptions
              title="pomodoro"
              numOptions={480}
              selectedTime={selectedPomodoro}
              onChange={setSelectedPomodoro}
            ></TimeOptions>
            <TimeOptions
              title="short break"
              numOptions={15}
              selectedTime={selectedShort}
              onChange={setSelectedShort}
            ></TimeOptions>
            <TimeOptions
              title="long break"
              numOptions={30}
              selectedTime={selectedLong}
              onChange={setSelectedLong}
            ></TimeOptions>
          </div>
          <div className={styles.modal__subContainer}>
            <h3 className={`${styles.modal__h3}`}>Font</h3>

            <RadioButton
              ids={fontIds}
              name="font"
              labelClassName={fontClassName}
              text="Aa"
              selectedOption={selectedFont}
              onChange={setSelectedFont}
            />
          </div>

          <div className={styles.modal__subContainer}>
            <h3 className={`${styles.modal__h3}`}>Color</h3>
            <RadioButton
              ids={colorIds}
              name="color"
              labelClassName={colorClassName}
              selectedOption={selectedColor}
              onChange={setSelectedColor}
            />
          </div>
          <button className={styles.modal__submit}>Apply</button>
        </form>
      </div>
    </div>
  );
}

function RadioButton({
  ids,
  name,
  labelClassName,
  text = "",
  selectedOption,
  onChange,
}) {
  return (
    <>
      {ids.map((id, i) => {
        return (
          <div className={styles.radioGroup} key={id}>
            <input
              value={id}
              checked={selectedOption === id}
              onChange={(e) => onChange(e.target.value)}
              type="radio"
              id={id}
              name={name}
              className={styles.radioInput}
            />
            <label
              htmlFor={id}
              className={`${styles[labelClassName]} ${
                styles[labelClassName + (i + 1)]
              } ${styles.radioLabel}`}
            >
              {text}
            </label>
          </div>
        );
      })}
    </>
  );
}

export default Settings;
