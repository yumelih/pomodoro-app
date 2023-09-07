import { useState } from "react";
import stylesModule from "./ProgressBar.module.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import Timer from "./Timer";
import StartPauseTimer from "./StartPauseTimer";

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
  pathColor: "#f25f4c",
  trailColor: "#d6d6d6",
  backgroundColor: "#3e98c7",
};

function ProgressBar({ isRunning, onRunning }) {
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  const [minutes, setMinutes] = useState(1);

  return (
    <div className={stylesModule.circleBar}>
      <CircularProgressbarWithChildren
        styles={buildStyles(styles)}
        value={secondsRemaining}
        minValue={0}
        maxValue={Number(minutes) * 60}
        strokeWidth={4}
      >
        <Timer
          min={Number(minutes)}
          isRunning={isRunning}
          onRunning={onRunning}
          secondsRemaining={secondsRemaining}
          setSecondsRemaining={setSecondsRemaining}
          setMinutes={setMinutes}
        />

        <StartPauseTimer isRunning={isRunning} onRunning={onRunning} />
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default ProgressBar;
