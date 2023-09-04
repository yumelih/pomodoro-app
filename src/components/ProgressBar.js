import { useState } from "react";
import stylesModule from "./ProgressBar.module.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import Timer from "./Timer";
import StartPauseTimer from "./StartPauseTimer";

const styles = {
  // Customize the root svg element
  root: {},
  // Customize the path, i.e. the "completed progress"
  path: {
    // Path color
    stroke: `rgba(62, 152, 199)`,
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: "butt",
    // Customize transition animation
    transition: "stroke-dashoffset 0.5s ease 0s",
    // Rotate the path
    transform: "rotate(0.25turn)",
    transformOrigin: "center center",
  },
  // Customize the circle behind the path, i.e. the "total progress"
  trail: {
    // Trail color
    stroke: "#d6d6d6",
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: "round",
    // Rotate the trail
    transform: "rotate(0.25turn)",
    transformOrigin: "center center",
  },
  // Customize the text
  text: {
    // Text color
    fill: "#f88",
    // Text size
    fontSize: "16px",
  },
  // Customize background - only used when the `background` prop is true
  background: {
    fill: "#3e98c7",
  },
};

function ProgressBar({ isRunning, onRunning }) {
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  const [minutes, setMinutes] = useState(1);

  return (
    <div className={stylesModule.circleBar}>
      <CircularProgressbarWithChildren
        styles={styles}
        value={secondsRemaining}
        minValue={0}
        maxValue={Number(minutes) * 60}
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
