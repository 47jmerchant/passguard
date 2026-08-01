// StrengthMeter.jsx
// A purely presentational component — it owns NO state.
// Everything it displays arrives via props from App.

// Props:
// - score: number 0–100
// - level: { label, color } object from getStrengthLevel
// - crackTime: friendly string from getCrackTime
function StrengthMeter({ score, level, crackTime }) {
  return (
    <div className="strength-meter">
      {/* The track (gray background bar) */}
      <div className="meter-track">
        {/* The fill — width and color are driven by props.
            CSS transitions (added in App.css) animate the changes. */}
        <div
          className="meter-fill"
          style={{
            width: `${score}%`,
            backgroundColor: level.color,
          }}
        />
      </div>

      <div className="meter-info">
        <span style={{ color: level.color, fontWeight: "bold" }}>
          {level.label}
        </span>
        <span className="crack-time">
          Time to crack: <strong>{crackTime}</strong>
        </span>
      </div>
    </div>
  );
}

export default StrengthMeter;