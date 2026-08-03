# Experiment No. 5

**Student Name:** Ishika Dubey
**PRN:** 24070521023
**File Path:** `Task5/5.1/index.html`

---

## Experiment Title
Demonstrate Array Methods (forEach, map, filter, reduce) using a Shopping Cart Calculator

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

---

## Experiment Program Code

### Task 5.1 — Shopping Cart Calculator

#### `5.1/index.html` (includes inline CSS and embedded JavaScript)
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
    let cart = [];   // let — block-scoped array

    function addProduct() {
      let name  = document.getElementById("name").value;
      let price = parseFloat(document.getElementById("price").value);
      let qty   = parseInt(document.getElementById("qty").value);

      if (name == "" || isNaN(price) || isNaN(qty)) {
        alert("Please enter all fields");
        return;
      }

      // Create product object and push to cart array
      let product = { id: cart.length + 1, name: name, price: price, quantity: qty };
      cart.push(product);
      displayCart();

      // Clear inputs
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

      // forEach — iterate and append each row to table
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

      // reduce — calculate grand total from all cart items
      let total = cart.reduce(function (sum, item) {
        return sum + (item.price * item.quantity);
      }, 0);

      // Discount logic using if-else-if
      let discount = 0;
      if      (total >= 50000) discount = total * 0.20;
      else if (total >= 20000) discount = total * 0.10;
      else if (total >= 5000)  discount = total * 0.05;

      let finalAmount = total - discount;

      // Template literals for result display
      document.getElementById("result").innerHTML = `
        <b>Total Amount :</b> ${total}<br>
        <b>Discount :</b> ${discount.toFixed(2)}<br>
        <b>Final Amount :</b> ${finalAmount.toFixed(2)}`;

      // map — build summary list (name : itemTotal)
      let summary = document.getElementById("summary");
      summary.innerHTML = "";
      cart.map(function (item) {
        summary.innerHTML += `<li>${item.name} : ${item.price * item.quantity}</li>`;
      });

      // filter — find products with price > 1000
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

---

## Output
- User inputs Product Name, Price, and Quantity, then clicks **Add Product**.
- Each product is appended to the cart table showing ID, Name, Price, Qty, and Total.
- After adding products:
  - **Total Amount** = sum of all `price × quantity` (using `reduce`)
  - **Discount** applied based on total:
    - ≥ ₹50,000 → 20% off
    - ≥ ₹20,000 → 10% off
    - ≥ ₹5,000  → 5% off
  - **Final Amount** = Total − Discount
  - **Item Summary** list is generated using `map` (name : item total)
  - **Expensive Products** (price > ₹1000) listed using `filter`

> **Screenshot:** See `image.png` in `Task5/5.1/` folder.

---

## Case Study Title
Shopping Cart Calculator using Array Methods — forEach, map, filter, reduce

## Case Study Program Code
> See the embedded `<script>` block inside `index.html` above.

| Array Method | Usage in Code |
|-------------|--------------|
| `forEach`   | Renders each cart item row in the table; lists expensive products |
| `map`       | Builds Item Summary list with `name : itemTotal` per product |
| `filter`    | Extracts products where `price > 1000` |
| `reduce`    | Calculates the grand total: `sum + (price × quantity)` |

## Output
- Cart dynamically updates as products are added.
- Discount is automatically computed and displayed.
- Summary and expensive product lists update on every add.

---

## Result / Conclusion
The practical was completed successfully. JavaScript array methods — `forEach`, `map`, `filter`, and `reduce` — were demonstrated through a functional Shopping Cart Calculator. Products are added dynamically, totals are computed using `reduce`, item summaries are generated using `map`, and products above ₹1000 are identified using `filter`. A discount system was also implemented using conditional statements.
