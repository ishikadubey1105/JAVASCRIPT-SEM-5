# Experiment No. 4

**Student Name:** Ishika Dubey
**PRN:** 24070521023
**File Path:** `PRACTICAL4/Task4.a/index.html` | `PRACTICAL4/Task4.a/script.js` | `PRACTICAL4/Task 4.b/index.html` | `PRACTICAL4/Task 4.b/script.js`

---

## Experiment Title
Use Function Types, Scope and Closures; Apply Try-Catch; Build a Palindrome Checker

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

---

## Experiment Program Code

### Task 4.a — Palindrome Checker

#### `Task4.a/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Palindrome Checker</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <h1>Palindrome Checker</h1>
    <h1>Ishika Dubey</h1>
    <h1>24070521023</h1>
    <p class="subtitle">Does it read the same forwards &amp; backwards?</p>

    <input type="text" id="wordInput" placeholder="Enter a word or phrase">
    <button onclick="checkPalindrome()">Check</button>

    <p id="result"></p>
    <p id="error"></p>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

#### `Task4.a/script.js`
```js
function isPalindrome(word) {
  var reversed = word.split("").reverse().join("");
  return word === reversed;
}

var cleanWord = function (word) {
  return word.toLowerCase().replace(/[^a-z0-9]/g, "");
};

var showResult = (message) => {
  document.getElementById("error").innerText  = "";
  document.getElementById("result").innerText = message;
};

function makeCounter() {
  var count = 0;
  return function () {
    count++;
    return count;
  };
}
var counter = makeCounter();

function checkPalindrome() {
  try {
    var input = document.getElementById("wordInput").value;

    if (input.trim() === "") {
      throw new Error("Please enter a word!");
    }

    var cleaned = cleanWord(input);
    var result  = isPalindrome(cleaned);

    if (result) {
      showResult('"' + input + '" is a Palindrome! ✅');
    } else {
      showResult('"' + input + '" is NOT a Palindrome ❌');
    }

  } catch (error) {
    alert(error.message);
  }
}
```

---

## Output (Task 4.a — Palindrome Checker)
- User enters a word or phrase (e.g., `racecar`, `madam`, `hello`).
- Clicking **Check** runs `checkPalindrome()`.
- Input is cleaned (lowercased, punctuation removed) then compared with its reverse.
- Result displayed: `"racecar" is a Palindrome! ✅` or `"hello" is NOT a Palindrome ❌`.
- If input is empty, a `try-catch` block catches the thrown Error and shows an alert.

> **Screenshot:**
> <img width="1917" height="1015" alt="image" src="https://github.com/user-attachments/assets/539e7206-cd4f-48f1-9bb3-605bac68d2dc" />

---

## Case Study Title
Vehicle Registration Number Validation Webpage using Functions, Scope, and Try-Catch

## Case Study Program Code

### Task 4.b — Vehicle Registration Validator

#### `Task 4.b/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vehicle Registration Validator</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <div class="top">
      <p class="tag">Task 4.b — Ishika Dubey · 24070521023</p>
      <h1>Vehicle<br>Registration</h1>
      <p class="desc">Enter your 10-character registration number below</p>
    </div>

    <div class="input-wrap">
      <input type="text" id="regInput" placeholder="MH12AB1234"
             maxlength="10" autocomplete="off" spellcheck="false">
      <span id="charCount">0/10</span>
    </div>

    <button id="validateBtn" onclick="validateRegistration()">Validate</button>

    <div id="resultBox" class="result-box">
      <span id="resultIcon"></span>
      <span id="resultTitle"></span>
    </div>

    <ul class="rules">
      <li id="rule1"><span></span> Not empty</li>
      <li id="rule2"><span></span> Exactly 10 chars</li>
      <li id="rule3"><span></span> [1–2] State — letters</li>
      <li id="rule4"><span></span> [3–4] District — digits</li>
      <li id="rule5"><span></span> [5–6] Series — letters</li>
      <li id="rule6"><span></span> [7–10] Vehicle — digits</li>
    </ul>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

#### `Task 4.b/script.js`
```js
function isUpperLetter(ch) { return ch >= 'A' && ch <= 'Z'; }
function isDigit(ch)       { return ch >= '0' && ch <= '9'; }

function validateRegistration() {
  const input = document.getElementById("regInput");
  const registrationNumber = input.value.trim();

  for (let i = 1; i <= 6; i++) {
    document.getElementById("rule" + i).classList.remove("pass", "fail");
  }

  try {
    if (registrationNumber.length === 0) {
      setRule(1, false);
      throw new Error("Registration number cannot be empty.");
    }
    setRule(1, true);

    if (registrationNumber.length !== 10) {
      setRule(2, false);
      throw new Error("Length must be exactly 10 characters. You entered "
                      + registrationNumber.length + ".");
    }
    setRule(2, true);

    if (!isUpperLetter(registrationNumber[0]) || !isUpperLetter(registrationNumber[1])) {
      setRule(3, false);
      throw new Error("First 2 characters (State Code) must be uppercase letters.");
    }
    setRule(3, true);

    if (!isDigit(registrationNumber[2]) || !isDigit(registrationNumber[3])) {
      setRule(4, false);
      throw new Error("Characters 3-4 (District Code) must be digits.");
    }
    setRule(4, true);

    if (!isUpperLetter(registrationNumber[4]) || !isUpperLetter(registrationNumber[5])) {
      setRule(5, false);
      throw new Error("Characters 5-6 (Series) must be uppercase letters.");
    }
    setRule(5, true);

    if (!isDigit(registrationNumber[6]) || !isDigit(registrationNumber[7]) ||
        !isDigit(registrationNumber[8]) || !isDigit(registrationNumber[9])) {
      setRule(6, false);
      throw new Error("Last 4 characters (Vehicle Number) must be digits.");
    }
    setRule(6, true);

    showResult("valid", "Valid Registration!");

  } catch (err) {
    showResult("invalid", err.message);
  }
}

function setRule(ruleNum, passed) {
  document.getElementById("rule" + ruleNum).classList.add(passed ? "pass" : "fail");
}

function showResult(type, title) {
  const btn = document.getElementById("validateBtn");
  btn.classList.remove("result-valid", "result-invalid");
  void btn.offsetWidth;

  if (type === "valid") {
    btn.textContent = "✓  Valid Registration!";
    btn.classList.add("result-valid");
  } else {
    btn.textContent = "✗  " + title;
    btn.classList.add("result-invalid");
  }
}

document.getElementById("regInput").addEventListener("input", function () {
  document.getElementById("charCount").textContent = this.value.length + "/10";
  const btn = document.getElementById("validateBtn");
  btn.textContent = "Validate";
  btn.classList.remove("result-valid", "result-invalid");
  for (let i = 1; i <= 6; i++) {
    document.getElementById("rule" + i).classList.remove("pass", "fail");
  }
  this.value = this.value.toUpperCase();
});

document.getElementById("regInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") validateRegistration();
});
```

---

## Output (Task 4.b — Vehicle Registration Validator)
- User types a registration number (e.g., `MH12AB1234`).
- Live character counter shows `X/10` as user types; input is auto-converted to uppercase.
- On clicking **Validate**:
  - Each of the 6 rules is checked inside a `try-catch` block.
  - Rules turn green (pass) or red (fail) individually.
  - The button changes to ✓ Valid or ✗ Error message.
- Format: `[2 state letters][2 district digits][2 series letters][4 vehicle digits]` — e.g., `MH12AB1234`.

> **Screenshot:**
> <img width="1917" height="1013" alt="image" src="https://github.com/user-attachments/assets/26eb110b-699b-44da-b154-3cd3cc12a759" />

---

## Result / Conclusion
The practical was completed successfully. Function types (Function Declaration, Function Expression, Arrow Function), scope (global, function, block), closures, and try-catch exception handling were implemented. A palindrome checker (Task 4.a) and a vehicle registration number validator (Task 4.b) were developed using JavaScript to validate user input and demonstrate string manipulation and error-handling concepts.
