import styles from "./SettingsButton.module.css";

function SettingsButton({ onSettingsOpen }) {
  return (
    <img
      onClick={() => onSettingsOpen((prev) => !prev)}
      src="/settings.png"
      alt="settings"
      className={styles.settingsBtn}
    />
  );
}

export default SettingsButton;
