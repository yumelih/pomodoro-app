import { useState, useEffect } from "react";
import Title from "./components/Title";
import AppNav from "./components/AppNav";
import ProgressBar from "./components/ProgressBar";

function App() {
  // const [minutes, setMinutes] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="App">
      <Title title="Pomodoro" />
      <AppNav />
      <ProgressBar
        // min={Number(minutes)}
        isRunning={isRunning}
        onRunning={setIsRunning}
      />
      {/* <Timer
        min={Number(minutes)}
        isRunning={isRunning}
        onRunning={setIsRunning}
      />
      <SelectTime type="min" limit="480" setTime={setMinutes} />
      <button onClick={() => setIsRunning(true)}>Start the Timer</button> */}
    </div>
  );
}

export default App;
