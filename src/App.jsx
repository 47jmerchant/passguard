import { useState } from "react";
import PasswordInput from "./components/PasswordInput";
import StrengthMeter from "./components/StrengthMeter";
import RuleChecklist from "./components/RuleChecklist";
import Generator from "./components/Generator";
import { getScore, getStrengthLevel, getCrackTime } from "./utils/passwordStrength";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");

  // Derived values — recalculated on every render from state.
  // No extra useState needed: score is COMPUTED from password, not stored.
  const score = getScore(password);
  // Show a neutral placeholder until the user actually types something
  const level = password
    ? getStrengthLevel(score)
    : { label: "—", color: "#ccc" };
  const crackTime = getCrackTime(password);

  return (
    <div className="app">
      <h1>🔐 PassGuard</h1>
       <p className="tagline">Test your password strength in real time</p>

      <PasswordInput password={password} onPasswordChange={setPassword} />
      <StrengthMeter score={score} level={level} crackTime={crackTime} />
      <RuleChecklist password={password} />
      <hr className="divider" />

      <Generator onUsePassword={setPassword} />
    </div>
  );
}

export default App;