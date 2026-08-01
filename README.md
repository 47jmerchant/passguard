# 🔐 PassGuard — Password Strength Analyzer
---
## Instructions for Use

1. **Test a password:** Type any password into the input field. The strength
   meter, estimated crack time, and requirements checklist update live with
   every keystroke. Use the **Show/Hide** button to toggle visibility.
2. **Read the feedback:** The colored bar and label (Weak → Okay → Strong →
   Excellent) reflect how many security rules the password passes. The
   checklist shows exactly which rules pass (✅) or fail (⬜).
3. **Generate a strong password:** In the generator section, pick a length
   (8–32) with the slider, choose which character types to include, and click
   **🎲 Generate**.
4. **Copy or test it:** Use **📋 Copy** to copy the result to your clipboard,
   or **⬆️ Test it** to send it up to the analyzer and see how it scores.

### Run it locally
Requires [Node.js](https://nodejs.org/) 18+.

```bash
git clone https://github.com/47jmerchant/passguard.git
cd passguard
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

---

## Project Summary

PassGuard is an interactive password security tool built with React. It
analyzes password strength in real time against a set of security rules,
estimates how long a brute-force attack would take to crack the password,
and generates cryptographically secure random passwords.

A key design decision: the crack-time estimator is **dictionary-aware**.
Passwords built on common words (like `Password123`) are flagged as crackable
"instantly" rather than receiving a misleading brute-force estimate, because
real attackers run dictionary attacks with common mutations before ever
resorting to brute force.

**Educational note:** PassGuard is a learning project. Its dictionary check
uses a small word list to demonstrate the concept; production tools like
zxcvbn check tens of thousands of leaked passwords, keyboard patterns, and
character substitutions. No passwords ever leave the browser — there is no
backend and nothing is stored or transmitted.

### Concepts demonstrated
- **Core JavaScript:** functions, objects (an array of rule objects with
  embedded test functions), arrays, regular expressions
- **Higher-order functions:** `filter`, `map`, `reduce`, `some`, and
  functions stored as object properties
- **React:** component-based architecture, `useState`, controlled inputs,
  lifting state up, derived state, conditional rendering, props vs. state
- **Asynchronous programming:** `async/await` with the Clipboard API
- **Event handling & form processing:** live text input, range slider,
  checkboxes, button actions
- **CSS:** custom properties (variables), transitions/animations, dark theme

---

## Key Features and Functionality

| Feature | How it works |
|---|---|
| **Live strength scoring** | Six security rules (length, lowercase, uppercase, number, symbol, not-a-common-password) are stored as an array of objects. `filter()` counts how many the password passes; the score is the percentage passed. |
| **Animated strength meter** | A purely presentational component driven by props. CSS transitions animate the bar's width and color as the score changes. |
| **Requirements checklist** | `map()` renders each rule object as a list item with a live pass/fail indicator. |
| **Crack-time estimation** | `reduce()` accumulates the character-set size the password draws from, then computes total combinations at an assumed 10 billion guesses/second. Dictionary-based passwords short-circuit to "instantly." |
| **Secure password generator** | Uses `crypto.getRandomValues()` (not `Math.random()`, which is predictable) to build passwords from the user's selected character pools. |
| **Copy & test actions** | Async Clipboard API for copying; "Test it" feeds the generated password back into the analyzer through a callback prop, demonstrating two-way parent-child data flow. |
| **Input validation** | The generator disables itself and shows a warning when no character types are selected; the analyzer shows a neutral state until input exists. |

### Component architecture
App (owns password state)
├── PasswordInput — controlled input + local show/hide state
├── StrengthMeter — presentational; score/level/crackTime via props
├── RuleChecklist — maps the rules array to live ✅/⬜ items
└── Generator — self-contained form state; sends output up via callback
---
## Technologies Used & Sources

### Stack
- [React 18](https://react.dev/) — UI components and state management
- [Vite](https://vite.dev/) — build tool and dev server
- Vanilla CSS with custom properties — no UI framework

### Sources & references
- [React Docs: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) — the "lifting state up" pattern used for the password state in `App`
- [React Docs: Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state) — controlled input pattern
- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), and [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) — higher-order array methods used in the scoring engine
- [MDN: Crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) — cryptographically secure randomness for the generator
- [MDN: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) — async copy-to-clipboard
- [MDN: Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) — character-class tests in the rules
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) — background on password strength guidance
- [zxcvbn (Dropbox)](https://github.com/dropbox/zxcvbn) — inspiration for dictionary-aware strength estimation
---

*Built as the final project for CS81 — JavaScript & React.*