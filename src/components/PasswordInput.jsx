// PasswordInput.jsx
// A controlled input component — React state is the single source of truth
// for the input's value, not the DOM itself.

import { useState } from "react";

// Props:
// - password: the current password string (owned by App)
// - onPasswordChange: function App gives us to update that state
function PasswordInput({ password, onPasswordChange }) {
  // This piece of state is LOCAL because only this component
  // cares about whether the password is visible or hidden
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input">
      <input
        // Toggle between hidden dots and plain text
        type={showPassword ? "text" : "password"}
        value={password}
        placeholder="Type a password..."
        // Every keystroke fires this event; we send the new value up to App
        onChange={(e) => onPasswordChange(e.target.value)}
        autoComplete="new-password"
      />
      <button
        type="button"
        className="toggle-btn"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "🙈 Hide" : "👁️ Show"}
      </button>
    </div>
  );
}

export default PasswordInput;