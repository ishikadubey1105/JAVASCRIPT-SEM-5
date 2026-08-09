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


## Task 5.2 — Max & Min Finder (Array of Objects)

### Aim
Create an array of objects from user input and find the Maximum and Minimum values using array methods — `map()`, `Math.max()`, `Math.min()`, `some()`.

### File Path
`Task5/5.2/index.html` + `Task5/5.2/script.js`

### Program Code

#### `5.2/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Task 5.2 – Max & Min</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f0f4f8;
      display: flex;
      justify-content: center;
      padding: 40px;
    }
    .box {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      width: 400px;
    }
    h2   { margin-bottom: 20px; color: #333; }
    input {
      width: 100%; padding: 10px; font-size: 16px;
      border: 1px solid #ccc; border-radius: 6px;
      margin-bottom: 10px; box-sizing: border-box;
    }
    button {
      width: 100%; padding: 10px; background: #4f46e5;
      color: white; font-size: 16px;
      border: none; border-radius: 6px; cursor: pointer;
    }
    button:hover { background: #4338ca; }
    .result { margin-top: 20px; display: none; }
    .result p { font-size: 16px; margin: 8px 0; color: #333; }
    .result span { font-weight: bold; color: #4f46e5; }
    .error { color: red; font-size: 14px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Task 5.2 – Max &amp; Min Finder</h2>

    <label>Enter numbers separated by commas:</label>
    <input type="text" id="inputNumbers" placeholder="e.g. 10, 25, 3, 47, 8" />
    <div class="error" id="errorMsg"></div>

    <button onclick="findMaxMin()">Find Max &amp; Min</button>

    <div class="result" id="result">
      <p>Numbers Array: <span id="arrDisplay"></span></p>
      <p>Maximum Value: <span id="maxVal"></span></p>
      <p>Minimum Value: <span id="minVal"></span></p>
    </div>

    <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;" />
    <p style="margin-top: 12px; font-size: 14px; color: #555;">
      <strong>Name:</strong> Ishika Dubey &nbsp;|&nbsp; <strong>PRN:</strong> 24070521023
    </p>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

#### `5.2/script.js`
```js
// Task 5.2 – Find Max & Min from Array of Objects (user input)

function findMaxMin() {
  const input      = document.getElementById("inputNumbers").value.trim();
  const errorMsg   = document.getElementById("errorMsg");
  const resultDiv  = document.getElementById("result");

  errorMsg.textContent   = "";
  resultDiv.style.display = "none";

  if (input === "") {
    errorMsg.textContent = "Please enter at least one number.";
    return;
  }

  // Convert input string → array of objects using map()
  const rawValues   = input.split(",");
  const numbersArray = rawValues.map((item, index) => ({
    id: index + 1,
    value: Number(item.trim())
  }));

  // Validate using some()
  const hasInvalid = numbersArray.some(obj => isNaN(obj.value));
  if (hasInvalid) {
    errorMsg.textContent = "Invalid input! Please enter numbers only, separated by commas.";
    return;
  }

  // Extract numeric values using map()
  const values = numbersArray.map(obj => obj.value);

  // Find max and min using Math methods + spread operator
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);

  // Display results
  document.getElementById("arrDisplay").textContent = "[" + values.join(", ") + "]";
  document.getElementById("maxVal").textContent     = maxVal;
  document.getElementById("minVal").textContent     = minVal;
  resultDiv.style.display = "block";
}
```

### Array Methods Used

| Method        | Purpose                                              |
|---------------|------------------------------------------------------|
| `map()`       | Converts input strings into array of number objects  |
| `map()`       | Extracts `value` from each object into a plain array |
| `some()`      | Validates that no entry is `NaN`                     |
| `Math.max()`  | Finds the largest number using spread operator       |
| `Math.min()`  | Finds the smallest number using spread operator      |

### Output
- User types comma-separated numbers (e.g. `10, 25, 3, 47, 8`)
- Clicking **Find Max & Min** shows:
  - Numbers Array: `[10, 25, 3, 47, 8]`
  - Maximum Value: **47**
  - Minimum Value: **3**
- Invalid input shows an error message in red

### Screenshot

> **Screenshot:**
> <img width="1919" height="1022" alt="image" src="https://github.com/user-attachments/assets/bcdca0e0-3fb7-4427-a1d6-5c0c576a92c3" />

> <img width="1907" height="1022" alt="image" src="https://github.com/user-attachments/assets/ea519977-a372-4b27-9151-8cdcf13d0747" />



---

## Result / Conclusion

Both tasks were completed successfully:

- **Task 5.1** demonstrated `forEach`, `map`, `filter`, and `reduce` through a Shopping Cart Calculator that dynamically adds products, computes totals, applies discounts, and lists expensive items.
- **Task 5.2** demonstrated `map()`, `some()`, `Math.max()`, and `Math.min()` by converting user-entered comma-separated numbers into an array of objects and finding the maximum and minimum values.
