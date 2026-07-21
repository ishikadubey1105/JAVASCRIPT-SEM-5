function calculateGrade() {
  var name  = document.getElementById("name").value;
  var marks = Number(document.getElementById("marks").value);

  // Validation
  if (name === "") {
    alert("Please enter student name.");
    return;
  }
  if (document.getElementById("marks").value === "") {
    alert("Please enter overall marks.");
    return;
  }
  if (marks < 0 || marks > 100) {
    alert("Marks must be between 0 and 100.");
    return;
  }

  // Determine grade
  var grade;
  if (marks >= 90) {
    grade = "A+";
  } else if (marks >= 80) {
    grade = "A";
  } else if (marks >= 70) {
    grade = "B";
  } else if (marks >= 60) {
    grade = "C";
  } else if (marks >= 50) {
    grade = "D";
  } else {
    grade = "F";
  }

  // Determine result
  var result = (marks >= 50) ? "Pass" : "Fail";

  // Display output
  var out = document.getElementById("output");
  out.innerHTML =
    "<strong>Student Name :</strong> " + name  + "<br>" +
    "<strong>Overall Marks :</strong> " + marks + " / 100<br>" +
    "<strong>Grade :</strong> "         + grade  + "<br>" +
    "<strong>Result :</strong> "        + result;
  out.style.display = "block";
}
