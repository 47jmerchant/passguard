// RuleChecklist.jsx
// Renders the full rules array with a live pass/fail state for each rule.
// Demonstrates .map() to turn an array of data into an array of JSX.

import { rules } from "../utils/passwordStrength";

// Props:
// - password: the current password (each rule tests it directly)
function RuleChecklist({ password }) {
  return (
    <ul className="rule-checklist">
      {/* map(): one <li> per rule object. The unique `id` becomes
          React's key so it can track each item across re-renders. */}
      {rules.map((rule) => {
        const passed = rule.test(password);
        return (
          <li key={rule.id} className={passed ? "rule passed" : "rule"}>
            <span className="rule-icon">{passed ? "✅" : "⬜"}</span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}

export default RuleChecklist;