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
      throw new Error(`Length must be exactly 10 characters. You entered ${regNum.length}.`);
    }
    setRule(2, true);

    const statePart = regNum.substring(0, 2);
    if (!/^[A-Z]{2}$/.test(statePart)) {
      setRule(3, false);
      throw new Error(`First 2 characters (State Code) must be uppercase alphabets. Got: "${statePart}"`);
    }
    setRule(3, true);

    const districtPart = regNum.substring(2, 4);
    if (!/^[0-9]{2}$/.test(districtPart)) {
      setRule(4, false);
      throw new Error(`Characters 3–4 (District Code) must be digits. Got: "${districtPart}"`);
    }
    setRule(4, true);

    const seriesPart = regNum.substring(4, 6);
    if (!/^[A-Z]{2}$/.test(seriesPart)) {
      setRule(5, false);
      throw new Error(`Characters 5–6 (Series) must be uppercase alphabets. Got: "${seriesPart}"`);
    }
    setRule(5, true);

    const vehiclePart = regNum.substring(6, 10);
    if (!/^[0-9]{4}$/.test(vehiclePart)) {
      setRule(6, false);
      throw new Error(`Last 4 characters (Vehicle Number) must be digits. Got: "${vehiclePart}"`);
    }
    setRule(6, true);

    showResult("valid", "Invalid Registration Number!");

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
  document.getElementById("charCount").textContent = `${this.value.length}/10`;

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
