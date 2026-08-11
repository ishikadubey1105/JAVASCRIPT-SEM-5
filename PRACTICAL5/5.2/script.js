// Task 5.2 – Find Max & Min from Array of Student Objects

// Array to store student objects
let students = [];

function addStudent() {
  const nameInput  = document.getElementById("studentName");
  const marksInput = document.getElementById("studentMarks");
  const errorMsg   = document.getElementById("errorMsg");

  const name  = nameInput.value.trim();
  const marks = Number(marksInput.value);

  // Clear previous error
  errorMsg.textContent = "";

  // Validation
  if (name === "") {
    errorMsg.textContent = "Please enter the student's name.";
    return;
  }

  if (marksInput.value === "" || isNaN(marks) || marks < 0 || marks > 100) {
    errorMsg.textContent = "Please enter valid marks between 0 and 100.";
    return;
  }

  // Create a student object and push to array
  const student = {
    id:    students.length + 1,
    name:  name,
    marks: marks
  };

  students.push(student);

  // Log array of objects to console
  console.log("Students Array:", students);

  // Update the table display
  renderTable();

  // Clear inputs
  nameInput.value  = "";
  marksInput.value = "";
  nameInput.focus();
}

function renderTable() {
  const table     = document.getElementById("studentTable");
  const tableBody = document.getElementById("tableBody");
  const findBtn   = document.getElementById("findBtn");

  // Use map() to build table rows from array of objects
  tableBody.innerHTML = students.map(function(student) {
    return `<tr>
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.marks}</td>
    </tr>`;
  }).join("");

  // Show table and find button once at least 2 students are added
  if (students.length >= 2) {
    table.style.display    = "table";
    findBtn.style.display  = "block";
  } else if (students.length === 1) {
    table.style.display   = "table";
    findBtn.style.display = "none";
  }

  // Hide result cards when table changes
  document.getElementById("resultCards").style.display = "none";
}

function findMaxMin() {
  // Use map() to extract marks from each student object
  const allMarks = students.map(function(student) {
    return student.marks;
  });

  console.log("All Marks extracted via map():", allMarks);

  // Find max and min marks using Math methods + spread operator
  const maxMarks = Math.max(...allMarks);
  const minMarks = Math.min(...allMarks);

  console.log("Highest Marks:", maxMarks);
  console.log("Lowest Marks:",  minMarks);

  // Use some() to validate — check if any entry has invalid marks (safety check)
  const hasInvalid = students.some(function(student) {
    return isNaN(student.marks);
  });

  if (hasInvalid) {
    document.getElementById("errorMsg").textContent = "Invalid data found in student list.";
    return;
  }

  // Find the actual student objects with those marks using find()
  const topStudent    = students.find(function(s) { return s.marks === maxMarks; });
  const bottomStudent = students.find(function(s) { return s.marks === minMarks; });

  console.log("Highest Scorer:", topStudent);
  console.log("Lowest Scorer:",  bottomStudent);

  // Display result cards
  document.getElementById("maxName").textContent  = topStudent.name;
  document.getElementById("maxMarks").textContent = maxMarks + " / 100";
  document.getElementById("minName").textContent  = bottomStudent.name;
  document.getElementById("minMarks").textContent = minMarks + " / 100";

  const resultCards = document.getElementById("resultCards");
  resultCards.style.display = "flex";
}

function resetAll() {
  students = [];

  document.getElementById("studentName").value  = "";
  document.getElementById("studentMarks").value = "";
  document.getElementById("errorMsg").textContent = "";
  document.getElementById("tableBody").innerHTML  = "";
  document.getElementById("studentTable").style.display  = "none";
  document.getElementById("findBtn").style.display       = "none";
  document.getElementById("resultCards").style.display   = "none";

  console.log("Reset! Students array cleared.");
}
