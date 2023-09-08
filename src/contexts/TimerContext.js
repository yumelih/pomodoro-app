import { createContext, useContext, useEffect, useReducer } from "react";

const TimerContext = createContext();

const initialState = {
  isRunning: false,
  isDropdownOpen: false,
  secondsRemaining: 60,
  selectedMinutes: 1,
  phase: "pomodoro",
  pomodoroCount: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "timer/start":
      return {
        ...state,
        isRunning: true,
        secondsRemaining: state.secondsRemaining - 1,
      };
    case "timer/pause":
      return { ...state, isRunning: false };
    case "timer/selectminutes": {
      return { ...state, isDropdownOpen: true };
    }
    case "timer/updateminutes":
      return {
        ...state,
        selectedMinutes: action.payload,
        secondsRemaining: action.payload * 60,
        isDropdownOpen: false,
      };
    case "timer/selectphase": {
      return { ...state, phase: action.payload };
    }
    case "timer/pomodoroend":
      return { ...initialState, phase: "short break" };
    case "timer/shortbreakend":
      return {
        ...initialState,
      };

    default:
      throw new Error("This action.type does not exist");
  }
}

function TimerProvider({ children }) {
  const [
    {
      isRunning,
      isDropdownOpen,
      secondsRemaining,
      selectedMinutes,
      phase,
      pomodoroCount,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      if (secondsRemaining === 0 && phase === "pomodoro")
        dispatch({ type: "timer/pomodoroend" });
      if (secondsRemaining === 0 && phase === "short break")
        dispatch({ type: "timer/shortbreakend" });

      if (isRunning && secondsRemaining > 0) {
        const interval = setInterval(() => {
          dispatch({ type: "timer/start" });
        }, 1000);
        return () => clearInterval(interval);
      }
    },
    [secondsRemaining, isRunning, phase]
  );

  return (
    <TimerContext.Provider
      value={{
        isRunning,
        isDropdownOpen,
        secondsRemaining,
        selectedMinutes,
        phase,
        pomodoroCount,
        dispatch,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
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
