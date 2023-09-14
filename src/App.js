import Title from "./components/Title";
import AppNav from "./components/AppNav";
import ProgressBar from "./components/ProgressBar";
import { TimerProvider } from "./contexts/TimerContext";
import SettingsButton from "./components/SettingsButton";
import { useState } from "react";
import Settings from "./components/Settings";

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <div className="App">
      <TimerProvider>
        <Title title="Pomodoro" />
        <AppNav />
        <ProgressBar />
        <SettingsButton onSettingsOpen={setSettingsOpen} />
        {settingsOpen && <Settings onSettingsOpen={setSettingsOpen} />}
      </TimerProvider>
    </div>
  );
}

export default App;
