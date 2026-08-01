// Generator.jsx
// A self-contained feature component: owns its own form state
// (length + options), and sends its output UP to App via a callback prop.

import { useState } from "react";
import { generatePassword } from "../utils/passwordStrength";

// Props:
// - onUsePassword: callback that puts a generated password into the analyzer
function Generator({ onUsePassword }) {
  const [length, setLength] = useState(16);
  // One state object for all four checkboxes instead of four useStates
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  // Toggle one option while keeping the others.
  // Spread syntax + computed property name — two core JS features.
  const toggleOption = (name) => {
    setOptions({ ...options, [name]: !options[name] });
  };

  const handleGenerate = () => {
    const pw = generatePassword(length, options);
    setGenerated(pw);
    setCopied(false); // reset the "Copied!" label for the new password
  };

  // Clipboard API is asynchronous — it returns a Promise,
  // so we use async/await (our async programming touch)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(generated);
    setCopied(true);
  };

  // True if no checkbox is selected — used to disable the button
  const nothingSelected = !Object.values(options).some(Boolean);

  return (
    <div className="generator">
      <h2>Password Generator</h2>

      {/* Length slider — a controlled input, same pattern as the text box */}
      <label className="length-label">
        Length: <strong>{length}</strong>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </label>

      {/* Checkboxes generated from the options object with .map() */}
      <div className="options">
        {Object.keys(options).map((name) => (
          <label key={name} className="option">
            <input
              type="checkbox"
              checked={options[name]}
              onChange={() => toggleOption(name)}
            />
            {name}
          </label>
        ))}
      </div>

      <button
        className="generate-btn"
        onClick={handleGenerate}
        disabled={nothingSelected}
      >
        🎲 Generate
      </button>
      {nothingSelected && (
        <p className="warning">Select at least one character type</p>
      )}

      {/* Only render the output row if a password exists — 
          conditional rendering with && */}
      {generated && (
        <div className="generated-output">
          <code>{generated}</code>
          <div className="output-actions">
            <button onClick={handleCopy}>
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
            <button onClick={() => onUsePassword(generated)}>
              ⬆️ Test it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Generator;