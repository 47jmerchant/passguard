// App.jsx — root component for PassGuard
// For now it's just a shell; we'll add components in later steps

function App() {
  return (
    <div className="app">
      <h1>🔐 PassGuard</h1>
      <p>Test your password strength in real time</p>
    </div>
  );
}

// App.jsx — root component for PassGuard
// Owns the password state so multiple child components can share it via props

import { useState } from "react";
import PasswordInput from "./components/PasswordInput";
import "./App.css";

function App() {
  // The password lives here (state) and flows down to children (props)
  const [password, setPassword] = useState("");

  return (
    <div className="app">
      <h1>🔐 PassGuard</h1>
      <p>Test your password strength in real time</p>

      <PasswordInput password={password} onPasswordChange={setPassword} />

      {/* Temporary debug line — proves state updates live. We'll remove it later. */}
      <p style={{ opacity: 0.5 }}>Current value: {password}</p>
    </div>
  );
}

export default App;