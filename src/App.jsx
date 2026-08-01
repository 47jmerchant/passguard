import { useState } from "react";
import PasswordInput from "./components/PasswordInput";
import { getScore, getStrengthLevel, getCrackTime } from "./utils/passwordStrength";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");

  // Derived values — recalculated on every render from state.
  // No extra useState needed: score is COMPUTED from password, not stored.
  const score = getScore(password);
  const level = getStrengthLevel(score);
  const crackTime = getCrackTime(password);

  return (
    <div className="app">
      <h1>🔐 PassGuard</h1>
      <p>Test your password strength in real time</p>

      <PasswordInput password={password} onPasswordChange={setPassword} />

      {/* Temporary — StrengthMeter component will replace this in Step 4 */}
      <p>
        Score: {score}/100 — <span style={{ color: level.color }}>{level.label}</span>
      </p>
      <p>Time to crack: {crackTime}</p>
    </div>
  );
}

export default App;