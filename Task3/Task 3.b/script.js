function isUpperCase(ch) {
  var code = ch.charCodeAt(0);
  return code >= 65 && code <= 90;
}
function isLowerCase(ch) {
  var code = ch.charCodeAt(0);
  return code >= 97 && code <= 122;
}
function isDigit(ch) {
  var code = ch.charCodeAt(0);
  return code >= 48 && code <= 57;
}
function isSpecial(ch) {
  if (isUpperCase(ch)) { return false; }
  if (isLowerCase(ch)) { return false; }
  if (isDigit(ch))     { return false; }
  return true;
}

function stripNonDigits(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    if (isDigit(str[i])) { result = result + str[i]; }
  }
  return result;
}

function hasMinLength(pwd) { return pwd.length >= 8; }

function hasUpperCase(pwd) {
  for (var i = 0; i < pwd.length; i++) {
    if (isUpperCase(pwd[i])) { return true; }
  }
  return false;
}
function hasLowerCase(pwd) {
  for (var i = 0; i < pwd.length; i++) {
    if (isLowerCase(pwd[i])) { return true; }
  }
  return false;
}
function hasDigit(pwd) {
  for (var i = 0; i < pwd.length; i++) {
    if (isDigit(pwd[i])) { return true; }
  }
  return false;
}
function hasSpecial(pwd) {
  for (var i = 0; i < pwd.length; i++) {
    if (isSpecial(pwd[i])) { return true; }
  }
  return false;
}

var rules = [
  { id: "rule-length",  check: hasMinLength },
  { id: "rule-upper",   check: hasUpperCase },
  { id: "rule-lower",   check: hasLowerCase },
  { id: "rule-number",  check: hasDigit     },
  { id: "rule-special", check: hasSpecial   }
];

var strengthLevels = [
  { label: "",       color: "#aaa",    width: "0%"   },
  { label: "Weak",   color: "#cc0000", width: "25%"  },
  { label: "Fair",   color: "#cc6600", width: "50%"  },
  { label: "Good",   color: "#888800", width: "75%"  },
  { label: "Strong", color: "#007700", width: "100%" }
];

function getPassCount(pwd) {
  var count = 0;
  for (var i = 0; i < rules.length; i++) {
    if (rules[i].check(pwd)) { count = count + 1; }
  }
  return count;
}

function validateMobile() {
  var inputEl = document.getElementById("mobile");
  var msgEl   = document.getElementById("mobileMsg");
  var cleaned = stripNonDigits(inputEl.value);

  var limited = "";
  for (var i = 0; i < cleaned.length; i++) {
    if (i < 10) { limited = limited + cleaned[i]; }
  }
  inputEl.value = limited;

  if (limited.length === 0) {
    msgEl.textContent = "";
  } else if (limited.length === 10) {
    msgEl.textContent = "Valid mobile number";
    msgEl.style.color = "#007700";
  } else {
    msgEl.textContent = "Must be exactly 10 digits (" + limited.length + "/10)";
    msgEl.style.color = "#cc0000";
  }
}

function validatePassword() {
  var pwd = document.getElementById("password").value;

  for (var i = 0; i < rules.length; i++) {
    var el = document.getElementById(rules[i].id);
    if (rules[i].check(pwd)) {
      el.classList.add("pass");
    } else {
      el.classList.remove("pass");
    }
  }

  var passed = getPassCount(pwd);
  var level  = (pwd.length === 0) ? 0 : passed;
  var s      = strengthLevels[level];

  document.getElementById("strengthFill").style.width      = s.width;
  document.getElementById("strengthFill").style.background = s.color;
  document.getElementById("strengthLabel").textContent     = s.label;
  document.getElementById("strengthLabel").style.color     = s.color;
}

function toggleVisibility(fieldId, btn) {
  var inputEl = document.getElementById(fieldId);
  if (inputEl.type === "password") {
    inputEl.type    = "text";
    btn.textContent = "Hide";
  } else {
    inputEl.type    = "password";
    btn.textContent = "Show";
  }
}

function handleSubmit() {
  var nameVal   = document.getElementById("name").value;
  var rollVal   = document.getElementById("rollno").value;
  var ageVal    = document.getElementById("age").value;
  var mobileVal = document.getElementById("mobile").value;
  var pwdVal    = document.getElementById("password").value;

  if (nameVal.length === 0) {
    alert("Please enter your Full Name.");
    return;
  }
  if (rollVal.length === 0) {
    alert("Please enter your Roll Number.");
    return;
  }
  if (ageVal.length === 0) {
    alert("Please enter your Age.");
    return;
  }
  if (mobileVal.length !== 10) {
    alert("Mobile number must be exactly 10 digits.");
    return;
  }
  if (hasMinLength(pwdVal) === false) {
    alert("Password must be at least 8 characters.");
    return;
  }
  if (hasUpperCase(pwdVal) === false) {
    alert("Password must contain at least one uppercase letter.");
    return;
  }
  if (hasLowerCase(pwdVal) === false) {
    alert("Password must contain at least one lowercase letter.");
    return;
  }
  if (hasDigit(pwdVal) === false) {
    alert("Password must contain at least one number.");
    return;
  }
  if (hasSpecial(pwdVal) === false) {
    alert("Password must contain at least one special character.");
    return;
  }

  var record = {
    name:    nameVal,
    rollno:  rollVal,
    age:     ageVal,
    mobile:  mobileVal,
    savedAt: new Date().toLocaleString()
  };

  localStorage.setItem("studentRecord", JSON.stringify(record));
  localStorage.setItem("savedPassword", pwdVal);

  var msgEl = document.getElementById("successMsg");
  msgEl.innerHTML =
    "Registration Successful!<br>" +
    "<small>Name: " + nameVal + " | Roll No: " + rollVal + " | Age: " + ageVal + "</small><br>" +
    "<small>Mobile: " + mobileVal + " | Saved on: " + record.savedAt + "</small>";
  msgEl.style.display = "block";

  var ids = ["name", "rollno", "age", "mobile", "password"];
  for (var i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).value = "";
  }
  document.getElementById("mobileMsg").textContent = "";
  document.getElementById("strengthFill").style.width  = "0%";
  document.getElementById("strengthLabel").textContent = "";

  for (var j = 0; j < rules.length; j++) {
    document.getElementById(rules[j].id).classList.remove("pass");
  }
}

window.onload = function () {
  var saved = localStorage.getItem("studentRecord");
  if (saved !== null) {
    var r     = JSON.parse(saved);
    var msgEl = document.getElementById("successMsg");
    msgEl.innerHTML =
      "Previously saved record found.<br>" +
      "<small>" + r.name + " | Roll: " + r.rollno + " | Registered on: " + r.savedAt + "</small>";
    msgEl.style.display = "block";
  }
};
