import { useEffect, useMemo, useState } from "react";
import { useTimer } from "../contexts/TimerContext";
import stylesModule from "./ProgressBar.module.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import Timer from "./Timer";
import StartPauseTimer from "./StartPauseTimer";

function ProgressBar() {
  const { userSelected, secondsRemaining, selectedMinutes } = useTimer();
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(
    function () {
      if (userSelected.color === "purple") {
        setSelectedColor("#d63af9");
      } else if (userSelected.color === "blue") {
        setSelectedColor("#3772ff");
      } else {
        setSelectedColor("#f25f4c");
      }
    },
    [userSelected.color, selectedColor]
  );

  const styles = {
    // Rotation of path and trail, in number of turns (0-1)
    rotation: -1,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: "butt",

    // Text size
    // textSize: "16px",

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.25,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: selectedColor,
    trailColor: "#d6d6d6",
    backgroundColor: "#3e98c7",
  };

  return (
    <div className={stylesModule.circleBar}>
      <CircularProgressbarWithChildren
        styles={buildStyles(styles)}
        value={secondsRemaining}
        minValue={0}
        maxValue={Number(selectedMinutes) * 60}
        strokeWidth={4}
      >
        <Timer />
        <StartPauseTimer />
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default ProgressBar;
