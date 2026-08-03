# Experiment No. 3

**Student Name:** Ishika Dubey
**PRN:** 24070521023
**File Path:** `PRACTICAL3/Task 3.a/index.html` | `PRACTICAL3/Task 3.a/script.js` | `PRACTICAL3/Task 3.b/index.html` | `PRACTICAL3/Task 3.b/script.js`

---

## Experiment Title
Implement Control Structures and Form Validation; Create a Grading System Based on User-Entered Marks

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

---

## Experiment Program Code

### Task 3.a — Student Grading System

#### `Task 3.a/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Grade Calculator</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <h2>Student Grading System</h2>

    <div class="form-group">
      <label for="name">Student Name</label>
      <input type="text" id="name" placeholder="Enter student name">
    </div>

    <div class="form-group">
      <label for="marks">Overall Marks (0 – 100)</label>
      <input type="number" id="marks" min="0" max="100" placeholder="e.g. 85">
    </div>

    <button onclick="calculateGrade()">Calculate Grade</button>

    <div id="output"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

#### `Task 3.a/script.js`
```js
function calculateGrade() {
  var name  = document.getElementById("name").value;
  var marks = Number(document.getElementById("marks").value);

  if (name === "") { alert("Please enter student name."); return; }
  if (document.getElementById("marks").value === "") {
    alert("Please enter overall marks."); return;
  }
  if (marks < 0 || marks > 100) { alert("Marks must be between 0 and 100."); return; }

  var grade;
  if (marks >= 90)      { grade = "A+"; }
  else if (marks >= 80) { grade = "A";  }
  else if (marks >= 70) { grade = "B";  }
  else if (marks >= 60) { grade = "C";  }
  else if (marks >= 50) { grade = "D";  }
  else                  { grade = "F";  }

  var result = (marks >= 50) ? "Pass" : "Fail";

  var out = document.getElementById("output");
  out.innerHTML =
    "<strong>Student Name :</strong> " + name  + "<br>" +
    "<strong>Overall Marks :</strong> " + marks + " / 100<br>" +
    "<strong>Grade :</strong> "         + grade  + "<br>" +
    "<strong>Result :</strong> "        + result;
  out.style.display = "block";
}
```

---

## Output (Task 3.a — Grading System)
- User enters Student Name and Marks (0–100).
- Clicking **Calculate Grade** applies the if-else-if ladder.
- Output displays: Name, Marks, Grade (A+ / A / B / C / D / F), and Result (Pass / Fail).
- Validation alerts fire if Name is empty, Marks field is empty, or value is out of range.

> **Screenshot:**
> <img width="1917" height="1023" alt="image" src="https://github.com/user-attachments/assets/c3066b89-182e-43a4-9c9e-4e9ada550d91" />

---

## Case Study Title
Password Validation Webpage using Form Validation and Control Structures

## Case Study Program Code

### Task 3.b — Student Login Page with Password Validation

#### `Task 3.b/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Registration</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <div class="card-header">
      <h2>Student Login Page</h2>
      <p class="subtitle">Fill in your details and create a secure password.</p>
    </div>

    <div class="row">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input type="text" id="name" placeholder="Enter your full name">
      </div>
      <div class="form-group">
        <label for="rollno">Roll Number</label>
        <input type="text" id="rollno" placeholder="e.g. 24070521023">
      </div>
    </div>

    <div class="row">
      <div class="form-group">
        <label for="age">Age</label>
        <input type="number" id="age" placeholder="Enter your age" min="1" max="120">
      </div>
      <div class="form-group">
        <label for="mobile">Mobile Number (10 digits)</label>
        <input type="tel" id="mobile" placeholder="Enter 10-digit mobile number"
               maxlength="10" oninput="validateMobile()">
        <span class="field-msg" id="mobileMsg"></span>
      </div>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <div class="input-wrap">
        <input type="password" id="password" placeholder="Enter your password"
               oninput="validatePassword()">
        <button type="button" class="toggle-btn" onclick="toggleVisibility('password', this)">Show</button>
      </div>
    </div>

    <div class="strength-wrap">
      <div class="strength-bar"><div class="strength-fill" id="strengthFill"></div></div>
      <span class="strength-label" id="strengthLabel"></span>
    </div>

    <ul class="rules">
      <li id="rule-length"  class="rule">At least 8 characters</li>
      <li id="rule-upper"   class="rule">At least one uppercase letter (A-Z)</li>
      <li id="rule-lower"   class="rule">At least one lowercase letter (a-z)</li>
      <li id="rule-number"  class="rule">At least one number (0-9)</li>
      <li id="rule-special" class="rule">At least one special character (!@#$...)</li>
    </ul>

    <button class="submit-btn" id="submitBtn" onclick="handleSubmit()">Register</button>
    <div class="success-msg" id="successMsg"></div>
    <p class="credit">Made by Ishika Dubey (24070521023)</p>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

#### `Task 3.b/script.js`
```js
function isUpperCase(ch) { return ch.charCodeAt(0) >= 65 && ch.charCodeAt(0) <= 90; }
function isLowerCase(ch) { return ch.charCodeAt(0) >= 97 && ch.charCodeAt(0) <= 122; }
function isDigit(ch)     { return ch.charCodeAt(0) >= 48 && ch.charCodeAt(0) <= 57; }
function isSpecial(ch)   { return !isUpperCase(ch) && !isLowerCase(ch) && !isDigit(ch); }

var rules = [
  { id: "rule-length",  check: function(p) { return p.length >= 8; } },
  { id: "rule-upper",   check: function(p) { for(var i=0;i<p.length;i++) if(isUpperCase(p[i])) return true; return false; } },
  { id: "rule-lower",   check: function(p) { for(var i=0;i<p.length;i++) if(isLowerCase(p[i])) return true; return false; } },
  { id: "rule-number",  check: function(p) { for(var i=0;i<p.length;i++) if(isDigit(p[i]))     return true; return false; } },
  { id: "rule-special", check: function(p) { for(var i=0;i<p.length;i++) if(isSpecial(p[i]))   return true; return false; } }
];

var strengthLevels = [
  { label: "",       color: "#aaa",    width: "0%"   },
  { label: "Weak",   color: "#cc0000", width: "25%"  },
  { label: "Fair",   color: "#cc6600", width: "50%"  },
  { label: "Good",   color: "#888800", width: "75%"  },
  { label: "Strong", color: "#007700", width: "100%" }
];

function validatePassword() {
  var pwd = document.getElementById("password").value;
  var passed = 0;
  for (var i = 0; i < rules.length; i++) {
    var el = document.getElementById(rules[i].id);
    if (rules[i].check(pwd)) { el.classList.add("pass"); passed++; }
    else { el.classList.remove("pass"); }
  }
  var level = (pwd.length === 0) ? 0 : passed;
  var s = strengthLevels[level];
  document.getElementById("strengthFill").style.width      = s.width;
  document.getElementById("strengthFill").style.background = s.color;
  document.getElementById("strengthLabel").textContent     = s.label;
}

function validateMobile() {
  var inputEl = document.getElementById("mobile");
  var msgEl   = document.getElementById("mobileMsg");
  var digits  = "";
  for (var i = 0; i < inputEl.value.length; i++) {
    if (isDigit(inputEl.value[i]) && digits.length < 10) digits += inputEl.value[i];
  }
  inputEl.value = digits;
  if (digits.length === 10) {
    msgEl.textContent = "Valid mobile number"; msgEl.style.color = "#007700";
  } else if (digits.length > 0) {
    msgEl.textContent = "Must be exactly 10 digits (" + digits.length + "/10)";
    msgEl.style.color = "#cc0000";
  } else { msgEl.textContent = ""; }
}

function toggleVisibility(fieldId, btn) {
  var inputEl = document.getElementById(fieldId);
  if (inputEl.type === "password") { inputEl.type = "text"; btn.textContent = "Hide"; }
  else { inputEl.type = "password"; btn.textContent = "Show"; }
}

function handleSubmit() {
  var nameVal   = document.getElementById("name").value;
  var rollVal   = document.getElementById("rollno").value;
  var ageVal    = document.getElementById("age").value;
  var mobileVal = document.getElementById("mobile").value;
  var pwdVal    = document.getElementById("password").value;

  if (nameVal.length === 0)    { alert("Please enter your Full Name.");   return; }
  if (rollVal.length === 0)    { alert("Please enter your Roll Number."); return; }
  if (ageVal.length === 0)     { alert("Please enter your Age.");         return; }
  if (mobileVal.length !== 10) { alert("Mobile must be exactly 10 digits."); return; }

  for (var i = 0; i < rules.length; i++) {
    if (!rules[i].check(pwdVal)) { alert("Password rule not satisfied."); return; }
  }

  var record = { name: nameVal, rollno: rollVal, age: ageVal,
                 mobile: mobileVal, savedAt: new Date().toLocaleString() };
  localStorage.setItem("studentRecord", JSON.stringify(record));

  var msgEl = document.getElementById("successMsg");
  msgEl.innerHTML = "Registration Successful!<br>" +
    "<small>Name: " + nameVal + " | Roll No: " + rollVal + " | Saved on: " + record.savedAt + "</small>";
  msgEl.style.display = "block";
}

window.onload = function () {
  var saved = localStorage.getItem("studentRecord");
  if (saved !== null) {
    var r = JSON.parse(saved);
    var msgEl = document.getElementById("successMsg");
    msgEl.innerHTML = "Previously saved record found.<br><small>" +
      r.name + " | Roll: " + r.rollno + " | Registered on: " + r.savedAt + "</small>";
    msgEl.style.display = "block";
  }
};
```

---

## Output (Task 3.b — Password Validation)
- Student fills Name, Roll Number, Age, Mobile, and Password.
- Real-time password strength bar updates as user types.
- Password rule checklist highlights each rule green when satisfied.
- On clicking **Register**:
  - All field validations run sequentially (if-else control structures).
  - On success: Registration Successful message displayed and record saved to `localStorage`.
  - On revisit: Previously saved record is auto-loaded.

> **Screenshot:**
> <img width="1906" height="1025" alt="image" src="https://github.com/user-attachments/assets/4fa5fb71-44d7-4194-844f-ba8f092ce422" />

---

## Result / Conclusion
The practical was completed successfully. Control structures (if-else, if-else-if, for loops, ternary operator) and form validation were implemented using JavaScript. A password validation system (Task 3.b) and a grading system (Task 3.a) were developed to validate user input and display the appropriate grade based on entered marks.
