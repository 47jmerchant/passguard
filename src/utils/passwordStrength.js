// passwordStrength.js
// Exports functions the components will import and use.

// An array of rule OBJECTS. Each rule has:
// - id: unique key (React will use this when rendering the checklist)
// - label: human-readable description for the UI
// - test: a function that takes the password and returns true/false
// Storing functions inside objects is a core JS concept in action.
export const rules = [
  {
    id: "length",
    label: "At least 12 characters",
    test: (pw) => pw.length >= 12,
  },
  {
    id: "lowercase",
    label: "Contains a lowercase letter",
    test: (pw) => /[a-z]/.test(pw),
  },
  {
    id: "uppercase",
    label: "Contains an uppercase letter",
    test: (pw) => /[A-Z]/.test(pw),
  },
  {
    id: "number",
    label: "Contains a number",
    test: (pw) => /[0-9]/.test(pw),
  },
  {
    id: "symbol",
    label: "Contains a symbol (!@#$...)",
    test: (pw) => /[^a-zA-Z0-9]/.test(pw),
  },
  {
    id: "noCommon",
    label: "Not a common password",
    // .some() is a higher-order function: true if ANY entry matches
    test: (pw) =>
        !["password", "123456", "qwerty", "letmein", "admin"].some((common) =>
        pw.toLowerCase().includes(common)
      ),
  },
];

// FILTER: keep only the rules this password passes.
// Returns an array of rule objects, so callers can count them or list them.
export function getPassedRules(password) {
  return rules.filter((rule) => rule.test(password));
}

// Score = percentage of rules passed (0–100).
export function getScore(password) {
  if (!password) return 0;
  const passed = getPassedRules(password);
  return Math.round((passed.length / rules.length) * 100);
}

// Convert a numeric score into a label + color the UI can use.
// Returning an object keeps related data bundled together.
export function getStrengthLevel(score) {
  if (score < 40) return { label: "Weak", color: "#e74c3c" };
  if (score < 70) return { label: "Okay", color: "#f39c12" };
  if (score < 100) return { label: "Strong", color: "#2ecc71" };
  return { label: "Excellent", color: "#27ae60" };
}

// Estimated time to crack via brute force.
// REDUCE: walk through the password's characters once and figure out
// which character sets it uses, accumulating the total "alphabet" size.
// Common base words that appear in cracking dictionaries.
// Defined once at module level so both the rule and getCrackTime share it.
const commonWords = ["password", "123456", "qwerty", "letmein", "admin", "welcome", "iloveyou"];

// Estimated time to crack.
// Real attackers try dictionary words + common mutations BEFORE brute force,
// so a password built on a common word falls almost immediately —
// regardless of what the brute-force math says.
export function getCrackTime(password) {
  if (!password) return "—";

  // Dictionary check first: strip the classic mutations (capitalization,
  // trailing digits/symbols) and see if a common word is what's left.
  const stripped = password.toLowerCase().replace(/[0-9!@#$%^&*]+$/, "");
  if (commonWords.includes(stripped)) {
    return "instantly (dictionary attack)";
  }

  // ...rest of the function stays the same (charsetSize reduce, etc.)
  const charsetSize = [
    { regex: /[a-z]/, size: 26 },
    { regex: /[A-Z]/, size: 26 },
    { regex: /[0-9]/, size: 10 },
    { regex: /[^a-zA-Z0-9]/, size: 32 },
  ].reduce(
    // accumulator starts at 0; add each set's size if the password uses it
    (total, set) => (set.regex.test(password) ? total + set.size : total),
    0
  );

  // Total combinations = charsetSize ^ length
  // Assume an attacker guessing 10 billion passwords per second
  const combinations = Math.pow(charsetSize, password.length);
  const seconds = combinations / 1e10;

  // Translate raw seconds into a friendly string
  if (seconds < 1) return "instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  const years = seconds / 31536000;
  if (years > 1e9) return "billions of years";
  return `${Math.round(years).toLocaleString()} years`;
}