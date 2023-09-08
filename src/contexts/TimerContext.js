import { createContext, useContext, useEffect, useReducer } from "react";

const TimerContext = createContext();

const initialState = {
  isRunning: false,
  isDropdownOpen: false,
  secondsRemaining: 0,
  selectedMinutes: 0,
  phase: "pomodoro",
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
    case "timer/pomodoroend":
      return { ...state, isRunning: false, secondsRemaining: 0 };
    case "timer/breakend":
      return { ...state, isRunning: false, secondsRemaining: 0 };

    default:
      throw new Error("This action.type does not exist");
  }
}

function TimerProvider({ children }) {
  const [
    { isRunning, isDropdownOpen, secondsRemaining, selectedMinutes },
    dispatch,
  ] = useReducer(reducer, initialState);

  // useEffect(
  //   function () {
  //     dispatch({ type: "timer/updateminutes", payload: selectedMinutes });
  //   },
  //   [selectedMinutes]
  // );

  useEffect(
    function () {
      if (secondsRemaining === 0) dispatch({ type: "timer/pomodoroend" });

      if (isRunning && secondsRemaining > 0) {
        const interval = setInterval(() => {
          dispatch({ type: "timer/start" });
        }, 1000);
        return () => clearInterval(interval);
      }
    },
    [secondsRemaining, isRunning]
  );

  return (
    <TimerContext.Provider
      value={{
        isRunning,
        isDropdownOpen,
        secondsRemaining,
        selectedMinutes,
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
