import Title from "./components/Title";
import AppNav from "./components/AppNav";
import ProgressBar from "./components/ProgressBar";
import { TimerProvider } from "./contexts/TimerContext";

function App() {
  return (
    <div className="App">
      <TimerProvider>
        <Title title="Pomodoro" />
        <AppNav />
        <ProgressBar />
      </TimerProvider>
    </div>
  );
}

export default App;
