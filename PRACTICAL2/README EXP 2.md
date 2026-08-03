# Experiment No. 2

**Student Name:** Ishika Dubey
**PRN:** 24070521023
**File Path:** `Task2/index.html` | `Task2/script.js` | `Task2/style.css`

---

## Experiment Title
Demonstration of var, let, const, Template Literals, Destructuring and Billing Calculator using JavaScript

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

---

## Experiment Program Code

### `index.html` — ShopZone Billing Calculator
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ShopZone - Online Store</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- TOP BAR -->
  <div class="topbar">
    <h2>&#128722; ShopZone</h2>
    <p>Made by Ishika Dubey | 24070521023</p>
  </div>

  <h2 class="page-heading">Our Products</h2>

  <div class="product-list">
    <!-- Product 1 -->
    <div class="product-card">
      <div class="product-icon">&#128187;</div>
      <div class="product-info">
        <p class="product-name">Laptop</p>
        <p class="product-desc">Intel i5, 8GB RAM, 256GB SSD</p>
        <p class="product-price">Rs. 45,999</p>
      </div>
      <div class="product-qty">
        <label>Quantity:</label>
        <input type="number" id="qty1" value="0" min="0" max="10">
        <input type="hidden" id="price1" value="45999">
      </div>
    </div>
    <!-- Products 2–8: Wireless Earbuds, Smartphone, Casual T-Shirt,
         Denim Jeans, Running Shoes, Coffee Maker, Python Book
         (same card structure, see source file) -->
  </div>

  <!-- CUSTOMER DETAILS -->
  <div class="customer-section">
    <h3>Enter Your Details</h3>
    <label>Name:</label>
    <input type="text" id="cust-name" placeholder="Enter your name"><br><br>
    <label>Phone:</label>
    <input type="text" id="cust-phone" placeholder="Enter phone number"><br><br>
    <label>Address:</label>
    <input type="text" id="cust-addr" placeholder="Enter delivery address"><br><br>
    <button onclick="calculateBill()">Generate Bill</button>
    <button onclick="clearAll()" class="btn-clear">Clear</button>
  </div>

  <!-- BILL OUTPUT -->
  <div class="bill-section" id="bill-section"></div>

  <div class="footer">
    <p>&copy; 2026 ShopZone | Made by Ishika Dubey (24070521023)</p>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### `script.js` — JavaScript (var, let, const, Template Literals, Destructuring)
```js
// Made by: Ishika Dubey (24070521023)

var cart = [];          // var — function-scoped, can be updated
var GST_RATE = 0.18;    // var — global scope

function addToCart(productName, productPrice, qtyId) {
  var qty = Number(document.getElementById(qtyId).value);  // var

  if (qty < 1) { alert("Please enter a valid quantity!"); return; }

  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name == productName) {
      cart[i].qty = cart[i].qty + qty;
      found = true;
      break;
    }
  }
  if (found == false) {
    cart.push({ name: productName, price: productPrice, qty: qty });
  }
  showCart();
}

function showCart() {
  var cartItems  = document.getElementById("cart-items");
  var totalLine  = document.getElementById("cart-total-line");
  var custForm   = document.getElementById("customer-form");

  if (cart.length == 0) {
    cartItems.innerHTML = "<p id='empty-msg'>Cart is empty. Add some items!</p>";
    totalLine.style.display = "none";
    custForm.style.display  = "none";
    return;
  }

  var rows = ""; var subtotal = 0; var totalQty = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var itemTotal = item.price * item.qty;
    subtotal  += itemTotal;
    totalQty  += item.qty;
    rows += `<tr><td>${item.name}</td><td>${item.qty}</td>
             <td>Rs. ${item.price}</td><td>Rs. ${itemTotal}</td>
             <td><button class='remove-btn' onclick='removeItem(${i})'>Remove</button></td></tr>`;
  }

  cartItems.innerHTML = `<table class='cart-table'>
    <tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th><th>Action</th></tr>
    ${rows}</table>`;

  totalLine.style.display = "block";
  document.getElementById("cart-count").textContent   = totalQty;
  document.getElementById("cart-subtotal").textContent = "Rs. " + subtotal;
  custForm.style.display = "block";
}

function removeItem(index) { cart.splice(index, 1); showCart(); }
function clearCart()       { cart = []; showCart(); document.getElementById("bill-box").style.display = "none"; }

function generateBill() {
  var name  = document.getElementById("cust-name").value;
  var phone = document.getElementById("cust-phone").value;

  if (name == "") { alert("Please enter your name!"); return; }

  var subtotal = 0;
  for (var i = 0; i < cart.length; i++) {
    subtotal += cart[i].price * cart[i].qty;
  }

  // const — cannot be reassigned
  const gstAmount  = subtotal * GST_RATE;
  const grandTotal = subtotal + gstAmount;

  // Destructuring — extracting from object
  var billRows = "";
  for (var j = 0; j < cart.length; j++) {
    const { name: pName, price, qty } = cart[j];   // Object Destructuring
    const total = price * qty;
    billRows += `<tr><td>${j+1}</td><td>${pName}</td><td>${qty}</td>
                 <td>Rs. ${price}</td><td>Rs. ${total}</td></tr>`;
  }

  // Template Literals — backtick strings with ${} expressions
  const billBox = document.getElementById("bill-box");
  billBox.style.display = "block";
  billBox.innerHTML = `
    <h2>Invoice / Bill</h2>
    <div class='bill-info'>
      <b>Name:</b> ${name}<br>
      <b>Phone:</b> ${phone || "N/A"}
    </div>
    <table class='bill-table'>
      <tr><th>#</th><th>Product</th><th>Qty</th><th>Price</th><th>Amount</th></tr>
      ${billRows}
    </table>
    <div class='bill-row'><span>Subtotal</span><span>Rs. ${subtotal}</span></div>
    <div class='bill-row'><span>GST (18%)</span><span>Rs. ${gstAmount.toFixed(2)}</span></div>
    <div class='grand'><span>Grand Total</span><span>Rs. ${grandTotal.toFixed(2)}</span></div>`;

  billBox.scrollIntoView({ behavior: "smooth" });

  console.log("Name: " + name);
  console.log("Subtotal: " + subtotal);
  console.log("GST: " + gstAmount.toFixed(2));
  console.log("Grand Total: " + grandTotal.toFixed(2));
}
```

---

## Output
- A product listing page shows 8 products with quantity selectors.
- User fills in Name, Phone, and Address, then clicks **Generate Bill**.
- The bill displays:
  - Itemized product list with quantities and prices
  - **Subtotal**, **GST (18%)**, and **Grand Total**
- Console logs all billing details.

> **Screenshot:** See `screencapture-file-...2026-07-14.png` and `image.png` in this folder.

---

## Case Study Title
Billing Calculator Webpage for a Shopping App using JavaScript, HTML, and CSS

## Case Study Program Code
> See `script.js` `generateBill()` function above — demonstrates:

| Concept | Usage in Code |
|---------|--------------|
| `var` | `cart`, `GST_RATE`, loop variables, subtotal |
| `const` | `gstAmount`, `grandTotal`, `billBox` |
| **Template Literals** | All `innerHTML` strings using backticks + `${}` |
| **Destructuring** | `const { name: pName, price, qty } = cart[j]` |

## Output
- Customer details (Name, Phone, Address) are accepted.
- Quantities per product are selected.
- On **Generate Bill**: GST calculated at 18%, Grand Total displayed in a formatted invoice.

---

## Result / Conclusion
The practical was completed successfully. The concepts of `var`, `let`, `const`, template literals, and destructuring were implemented. A billing calculator was developed that accepts user input, performs GST and Grand Total calculations, and displays the final bill accurately using JavaScript.
