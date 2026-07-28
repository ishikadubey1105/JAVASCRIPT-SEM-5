function isUpperLetter(ch) {
  return ch >= 'A' && ch <= 'Z';
}

function isDigit(ch) {
  return ch >= '0' && ch <= '9';
}

function validateRegistration() {
  const input = document.getElementById("regInput");
  const regNum = input.value.trim();

  for (let i = 1; i <= 6; i++) {
    document.getElementById("rule" + i).classList.remove("pass", "fail");
  }

  try {
    if (regNum.length === 0) {
      setRule(1, false);
      throw new Error("Registration number cannot be empty.");
    }
    setRule(1, true);

    if (regNum.length !== 10) {
      setRule(2, false);
      throw new Error("Length must be exactly 10 characters. You entered " + regNum.length + ".");
    }
    setRule(2, true);

    if (!isUpperLetter(regNum[0]) || !isUpperLetter(regNum[1])) {
      setRule(3, false);
      throw new Error("First 2 characters (State Code) must be uppercase letters. Got: " + regNum[0] + regNum[1]);
    }
    setRule(3, true);

    if (!isDigit(regNum[2]) || !isDigit(regNum[3])) {
      setRule(4, false);
      throw new Error("Characters 3-4 (District Code) must be digits. Got: " + regNum[2] + regNum[3]);
    }
    setRule(4, true);

    if (!isUpperLetter(regNum[4]) || !isUpperLetter(regNum[5])) {
      setRule(5, false);
      throw new Error("Characters 5-6 (Series) must be uppercase letters. Got: " + regNum[4] + regNum[5]);
    }
    setRule(5, true);

    if (!isDigit(regNum[6]) || !isDigit(regNum[7]) || !isDigit(regNum[8]) || !isDigit(regNum[9])) {
      setRule(6, false);
      throw new Error("Last 4 characters (Vehicle Number) must be digits. Got: " + regNum[6] + regNum[7] + regNum[8] + regNum[9]);
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
    btn.textContent = "\u2713  Valid Registration!";
    btn.classList.add("result-valid");
  } else {
    btn.textContent = "\u2717  " + title;
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
