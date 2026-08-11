# Experiment No. 5

**Student Name:** Ishika Dubey
**PRN:** 24070521023

---

## Experiment Title
Apply Array Methods and Object Handling in JavaScript

---

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

---

## Task 5.1 — Shopping Cart Calculator

### Aim
Demonstrate JavaScript array methods — `forEach`, `map`, `filter`, `reduce` — using a Shopping Cart Calculator with product objects.

### File Path
`Task5/5.1/index.html`

### Program Code

#### `5.1/index.html`
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Shopping Cart</title>
  <style>
    body { font-family: Arial; background: #f2f2f2; }
    .container {
      width: 800px; margin: 30px auto; background: white;
      padding: 20px; border-radius: 10px; box-shadow: 0 0 10px gray;
    }
    input  { padding: 8px; width: 150px; margin: 5px; }
    button { padding: 10px; cursor: pointer; }
    table  { width: 100%; border-collapse: collapse; margin-top: 20px; }
    table, th, td { border: 1px solid black; }
    th { background: #007bff; color: white; }
    th, td { padding: 10px; text-align: center; }
    .result { margin-top: 20px; font-size: 18px; }
  </style>
</head>
<body>
  <h2>Shopping Cart Calculator</h2>
  <input type="text"   id="name"  placeholder="Product Name">
  <input type="number" id="price" placeholder="Price">
  <input type="number" id="qty"   placeholder="Quantity">

  <button onclick="addProduct()">Add Product</button>

  <table id="cartTable">
    <tr>
      <th>ID</th><th>Product</th><th>Price</th>
      <th>Quantity</th><th>Total</th>
    </tr>
  </table>

  <div class="result" id="result">
    <h3>Item Summary</h3>
    <ul id="summary"></ul>
    <h3>Expensive Products (Price > 1000)</h3>
    <ul id="expensive"></ul>
  </div>

  <script>
    let cart = [];

    function addProduct() {
      let name  = document.getElementById("name").value;
      let price = parseFloat(document.getElementById("price").value);
      let qty   = parseInt(document.getElementById("qty").value);

      if (name == "" || isNaN(price) || isNaN(qty)) {
        alert("Please enter all fields");
        return;
      }

      let product = { id: cart.length + 1, name: name, price: price, quantity: qty };
      cart.push(product);
      displayCart();

      document.getElementById("name").value  = "";
      document.getElementById("price").value = "";
      document.getElementById("qty").value   = "";
    }

    function displayCart() {
      let table = document.getElementById("cartTable");
      table.innerHTML = `
        <tr>
          <th>ID</th><th>Product</th><th>Price</th>
          <th>Quantity</th><th>Total</th>
        </tr>`;

      // forEach — renders each cart item row
      cart.forEach(function (item) {
        table.innerHTML += `
          <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity}</td>
          </tr>`;
      });

      // reduce — calculates grand total
      let total = cart.reduce(function (sum, item) {
        return sum + (item.price * item.quantity);
      }, 0);

      let discount = 0;
      if      (total >= 50000) discount = total * 0.20;
      else if (total >= 20000) discount = total * 0.10;
      else if (total >= 5000)  discount = total * 0.05;

      let finalAmount = total - discount;

      document.getElementById("result").innerHTML = `
        <b>Total Amount :</b> ${total}<br>
        <b>Discount :</b> ${discount.toFixed(2)}<br>
        <b>Final Amount :</b> ${finalAmount.toFixed(2)}`;

      // map — builds item summary list
      let summary = document.getElementById("summary");
      summary.innerHTML = "";
      cart.map(function (item) {
        summary.innerHTML += `<li>${item.name} : ${item.price * item.quantity}</li>`;
      });

      // filter — finds products with price > 1000
      let expensive = document.getElementById("expensive");
      expensive.innerHTML = "";
      let exp = cart.filter(function (item) {
        return item.price > 1000;
      });
      exp.forEach(function (item) {
        expensive.innerHTML += `<li>${item.name}</li>`;
      });
    }
  </script>
</body>
</html>
```

### Array Methods Used

| Method     | Purpose                                                    |
|------------|------------------------------------------------------------|
| `forEach`  | Renders each cart item as a table row                      |
| `map`      | Builds Item Summary list with `name : itemTotal`           |
| `filter`   | Extracts products where `price > 1000`                     |
| `reduce`   | Calculates grand total: `sum + (price × quantity)`         |

### Output
- User enters Product Name, Price, and Quantity → clicks **Add Product**
- Table shows ID, Name, Price, Qty, Total for each product
- Discount applied automatically:
  - ≥ ₹50,000 → 20% off
  - ≥ ₹20,000 → 10% off
  - ≥ ₹5,000  → 5% off
- Final Amount = Total − Discount
- Item Summary and Expensive Products lists update on every add


## Task 5.2 — Student Marks Analyser (Max & Min from Array of Objects)

### Aim
Build a Student Marks Analyser application that stores student data as an array of objects and finds the Highest and Lowest Scorer using array methods — `map()`, `Math.max()`, `Math.min()`, `some()`, `find()`.

### File Path
`Task5/5.2/index.html` + `Task5/5.2/script.js`

### Program Code

#### `5.2/index.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Task 5.2 - Student Marks Analyser</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      height: 100%;
      overflow: hidden;
    }

    body {
      font-family: Arial, sans-serif;
      background: #1e3a5f;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      width: 500px;
      padding: 24px 28px;
    }

    h2 { color: #1e3a5f; font-size: 20px; margin-bottom: 4px; }

    .subtitle { font-size: 12px; color: #777; margin-bottom: 16px; }

    .input-row { display: flex; gap: 8px; margin-bottom: 6px; }

    .input-row input {
      flex: 1; padding: 9px 10px; font-size: 13px;
      border: 1px solid #ccc; border-radius: 6px;
    }

    .input-row input:focus { outline: none; border-color: #1e3a5f; }

    .btn-add {
      padding: 9px 14px; background: #1e3a5f; color: white;
      font-size: 13px; border: none; border-radius: 6px;
      cursor: pointer; white-space: nowrap;
    }

    .btn-add:hover { background: #16304f; }

    .error { color: #c0392b; font-size: 12px; min-height: 16px; margin-bottom: 6px; }

    table { width: 100%; border-collapse: collapse; margin-bottom: 12px; display: none; }

    table th {
      background: #1e3a5f; color: white;
      padding: 8px 10px; text-align: left; font-size: 13px;
    }

    table td { padding: 7px 10px; font-size: 13px; border-bottom: 1px solid #eee; color: #333; }

    table tr:nth-child(even) td { background: #f5f8ff; }

    .btn-find {
      width: 100%; padding: 9px; background: #2e7d32; color: white;
      font-size: 13px; border: none; border-radius: 6px;
      cursor: pointer; margin-bottom: 12px; display: none;
    }

    .btn-find:hover { background: #245c27; }

    .result-cards { display: none; flex-direction: row; gap: 10px; margin-bottom: 10px; }

    .card { flex: 1; padding: 14px; border-radius: 8px; text-align: center; }

    .card.max { background: #e8f5e9; border: 1px solid #2e7d32; }
    .card.min { background: #fdecea; border: 1px solid #c62828; }

    .card .label {
      font-size: 11px; font-weight: bold;
      text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;
    }

    .card.max .label { color: #2e7d32; }
    .card.min .label { color: #c62828; }

    .card .student-name { font-size: 15px; font-weight: bold; color: #222; margin-bottom: 2px; }

    .card .student-marks { font-size: 22px; font-weight: bold; }

    .card.max .student-marks { color: #2e7d32; }
    .card.min .student-marks { color: #c62828; }

    .btn-reset {
      width: 100%; padding: 8px; background: transparent; color: #999;
      font-size: 12px; border: 1px solid #ddd; border-radius: 6px;
      cursor: pointer; margin-bottom: 14px;
    }

    .btn-reset:hover { background: #f9f9f9; color: #555; }

    hr { border: none; border-top: 1px solid #eee; margin-bottom: 10px; }

    .footer { font-size: 12px; color: #999; }
  </style>
</head>

<body>
  <div class="container">

    <h2>Student Marks Analyser</h2>
    <p class="subtitle">Task 5.2 — Find Highest and Lowest Scorer using Array of Objects</p>

    <div class="input-row">
      <input type="text"   id="studentName"  placeholder="Student Name" />
      <input type="number" id="studentMarks" placeholder="Marks (0-100)" min="0" max="100" />
      <button class="btn-add" onclick="addStudent()">Add</button>
    </div>
    <div class="error" id="errorMsg"></div>

    <table id="studentTable">
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Marks</th>
        </tr>
      </thead>
      <tbody id="tableBody"></tbody>
    </table>

    <button class="btn-find" id="findBtn" onclick="findMaxMin()">
      Find Highest and Lowest Scorer
    </button>

    <div class="result-cards" id="resultCards">
      <div class="card max">
        <div class="label">Highest Scorer</div>
        <div class="student-name" id="maxName">-</div>
        <div class="student-marks" id="maxMarks">-</div>
      </div>
      <div class="card min">
        <div class="label">Lowest Scorer</div>
        <div class="student-name" id="minName">-</div>
        <div class="student-marks" id="minMarks">-</div>
      </div>
    </div>

    <button class="btn-reset" onclick="resetAll()">Reset</button>

    <hr />
    <p class="footer">
      <strong>Name:</strong> Ishika Dubey &nbsp;|&nbsp; <strong>PRN:</strong> 24070521023
    </p>

  </div>

  <script src="script.js"></script>
</body>

</html>
```

#### `5.2/script.js`
```js
// Task 5.2 – Find Max & Min from Array of Student Objects

let students = [];

function addStudent() {
  const nameInput  = document.getElementById("studentName");
  const marksInput = document.getElementById("studentMarks");
  const errorMsg   = document.getElementById("errorMsg");

  const name  = nameInput.value.trim();
  const marks = Number(marksInput.value);

  errorMsg.textContent = "";

  if (name === "") {
    errorMsg.textContent = "Please enter the student's name.";
    return;
  }

  if (marksInput.value === "" || isNaN(marks) || marks < 0 || marks > 100) {
    errorMsg.textContent = "Please enter valid marks between 0 and 100.";
    return;
  }

  // Create a student object and push to array
  const student = { id: students.length + 1, name: name, marks: marks };
  students.push(student);

  console.log("Students Array:", students);

  renderTable();

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

  if (students.length >= 2) {
    table.style.display   = "table";
    findBtn.style.display = "block";
  } else if (students.length === 1) {
    table.style.display   = "table";
    findBtn.style.display = "none";
  }

  document.getElementById("resultCards").style.display = "none";
}

function findMaxMin() {
  // Use map() to extract marks from each student object
  const allMarks = students.map(function(student) {
    return student.marks;
  });

  console.log("All Marks extracted via map():", allMarks);

  // Find max and min using Math methods + spread operator
  const maxMarks = Math.max(...allMarks);
  const minMarks = Math.min(...allMarks);

  // Use some() to validate — safety check for NaN
  const hasInvalid = students.some(function(student) {
    return isNaN(student.marks);
  });

  if (hasInvalid) {
    document.getElementById("errorMsg").textContent = "Invalid data found in student list.";
    return;
  }

  // Use find() to get the actual student objects
  const topStudent    = students.find(function(s) { return s.marks === maxMarks; });
  const bottomStudent = students.find(function(s) { return s.marks === minMarks; });

  console.log("Highest Scorer:", topStudent);
  console.log("Lowest Scorer:",  bottomStudent);

  document.getElementById("maxName").textContent  = topStudent.name;
  document.getElementById("maxMarks").textContent = maxMarks + " / 100";
  document.getElementById("minName").textContent  = bottomStudent.name;
  document.getElementById("minMarks").textContent = minMarks + " / 100";

  document.getElementById("resultCards").style.display = "flex";
}

function resetAll() {
  students = [];

  document.getElementById("studentName").value    = "";
  document.getElementById("studentMarks").value   = "";
  document.getElementById("errorMsg").textContent = "";
  document.getElementById("tableBody").innerHTML  = "";
  document.getElementById("studentTable").style.display = "none";
  document.getElementById("findBtn").style.display      = "none";
  document.getElementById("resultCards").style.display  = "none";

  console.log("Reset! Students array cleared.");
}
```

### Array Methods Used

| Method        | Purpose                                                          |
|---------------|------------------------------------------------------------------|
| `map()`       | Converts student objects into table rows for display             |
| `map()`       | Extracts `marks` from each student object into a plain array     |
| `some()`      | Validates that no student has `NaN` marks                        |
| `find()`      | Retrieves the student object that holds the max or min marks     |
| `Math.max()`  | Finds the highest marks using the spread operator                |
| `Math.min()`  | Finds the lowest marks using the spread operator                 |

### Output
- User enters Student Name and Marks (0–100) and clicks **Add**
- A table appears listing all added students
- The **Find Highest and Lowest Scorer** button appears after at least 2 students are added
- Clicking it shows two result cards side by side:
  - **Highest Scorer** — student name and marks (green card)
  - **Lowest Scorer** — student name and marks (red card)
- **Reset** clears all data
- The entire page fits on one screen with no scrolling

### Screenshot

> **Screenshot:**
> <img width="1919" height="1014" alt="image" src="https://github.com/user-attachments/assets/53f8082b-f7a9-4f3c-a784-214289b48eab" />


> <img width="1907" height="1022" alt="image" src="https://github.com/user-attachments/assets/ea519977-a372-4b27-9151-8cdcf13d0747" />



---

## Result / Conclusion

Both tasks were completed successfully:

- **Task 5.1** demonstrated `forEach`, `map`, `filter`, and `reduce` through a Shopping Cart Calculator that dynamically adds products, computes totals, applies discounts, and lists expensive items.
- **Task 5.2** demonstrated `map()`, `some()`, `find()`, `Math.max()`, and `Math.min()` through a Student Marks Analyser application that stores student data as an array of objects and identifies the highest and lowest scorer.

