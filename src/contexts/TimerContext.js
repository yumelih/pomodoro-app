import { createContext, useContext, useState } from "react";

const TimerContext = createContext();

const initialState = {
  isRunning: false,
  secondsRemaining: 0,
  selectedMinutes: 0,
};

function TimerProvider({ children }) {
  const [isRunning, setIsRunning] = useState(false);

  return <TimerContext.Provider>{children}</TimerContext.Provider>;
}

function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined)
    throw new Error(
      "Please use TimerContext inside the TimerProvider children components"
    );
  return context;
}

export { TimerProvider, useTimer };
