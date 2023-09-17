import { createContext, useContext, useEffect, useReducer } from "react";
import { usePersistReducer } from "use-persist";

const TimerContext = createContext();

const config = {
  key: "timer",
};

const initialState = {
  isRunning: false,
  isDropdownOpen: false,
  secondsRemaining: 1500,
  selectedMinutes: 25,
  phase: "pomodoro",
  pomodoroCount: 0,
  userSelected: {
    time: { pomodoroTime: 25, shortBreakTime: 5, longBreakTime: 20 },
    color: "red",
    font: "serif",
  },
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
      const currentPhase = action.payload;
      let selectedMinutes;
      let secondsRemaining;
      if (currentPhase === "long break") {
        selectedMinutes = state.userSelected.time.longBreakTime;
        secondsRemaining = selectedMinutes * 60;
      } else if (currentPhase === "short break") {
        selectedMinutes = state.userSelected.time.shortBreakTime;
        secondsRemaining = selectedMinutes * 60;
      } else {
        selectedMinutes = state.userSelected.time.pomodoroTime;
        secondsRemaining = selectedMinutes * 60;
      }
      return {
        ...state,
        phase: action.payload,
        secondsRemaining,
        selectedMinutes,
      };
    }
    case "timer/pomodoroend":
      const updatedPomodoroCount = state.pomodoroCount + 1;
      const newPhase =
        updatedPomodoroCount === 4 ? "long break" : "short break"; // changed from 3 to 4 for a pomodoro cycle of 4

      const newSelectedMinutes =
        newPhase === "long break"
          ? state.userSelected.time.longBreakTime
          : state.userSelected.time.shortBreakTime;

      return {
        ...initialState,
        pomodoroCount: updatedPomodoroCount,
        phase: newPhase,
        selectedMinutes: newSelectedMinutes,
        secondsRemaining: newSelectedMinutes * 60,
      };
    case "timer/breakend":
      const selectedMinutes = state.userSelected.time.pomodoroTime;
      const pomodoroSecondsRemaining = selectedMinutes * 60;
      return {
        ...initialState,
        selectedMinutes,
        secondsRemaining: pomodoroSecondsRemaining,
        pomodoroCount: state.phase === "short break" ? state.pomodoroCount : 0,
      };
    case "timer/settingschange":
      const pomodoroTime = action.payload.time.pomodoroTime;
      const secondsRemaining = pomodoroTime * 60;

      return {
        ...state,
        phase: "pomodoro",
        selectedMinutes: pomodoroTime,
        secondsRemaining,

        userSelected: {
          time: {
            pomodoroTime,
            shortBreakTime: action.payload.time.shortBreakTime,
            longBreakTime: action.payload.time.longBreakTime,
          },
          color: action.payload.color,
          font: action.payload.font,
        },
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
      userSelected,
    },
    dispatch,
  ] = usePersistReducer(config, reducer, initialState);

  useEffect(
    function () {
      if (secondsRemaining === 0 && phase === "pomodoro")
        dispatch({ type: "timer/pomodoroend" });
      if (secondsRemaining === 0 && phase !== "pomodoro")
        dispatch({ type: "timer/breakend" });

      if (isRunning && secondsRemaining > 0) {
        const interval = setInterval(() => {
          dispatch({ type: "timer/start" });
        }, 1000);
        return () => clearInterval(interval);
      }
    },
    [secondsRemaining, isRunning, phase]
  );

  useEffect(
    function () {
      let selectedColor;
      if (userSelected.color === "purple") {
        selectedColor = "#d63af9";
      } else if (userSelected.color === "blue") {
        selectedColor = "#3772ff";
      } else {
        selectedColor = "#f25f4c";
      }

      document.documentElement.style.setProperty(
        "--accent-main-color",
        selectedColor
      );
    },
    [userSelected.color]
  );

  useEffect(
    function () {
      let selectedFont;
      if (userSelected.font === "system-ui") {
        selectedFont = "Amatic SC, cursive";
      } else if (userSelected.font === "serif") {
        selectedFont = "Bebas Neue, sans-serif";
      } else {
        selectedFont = "Oswald, sans-serif";
      }

      document.documentElement.style.setProperty("--main-font", selectedFont);
    },
    [userSelected.font]
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
        userSelected,
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
