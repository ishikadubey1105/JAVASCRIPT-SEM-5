var cart = [];
var GST_RATE = 0.18;

function addToCart(productName, productPrice, qtyId) {
  var qty = Number(document.getElementById(qtyId).value);

  if (qty < 1) {
    alert("Please enter a valid quantity!");
    return;
  }

  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name == productName) {
      cart[i].qty = cart[i].qty + qty;
      found = true;
      break;
    }
  }

  if (found == false) {
    cart.push({
      name  : productName,
      price : productPrice,
      qty   : qty
    });
  }

  showCart();
}

function showCart() {
  var cartItems = document.getElementById("cart-items");
  var totalLine = document.getElementById("cart-total-line");
  var custForm  = document.getElementById("customer-form");

  if (cart.length == 0) {
    cartItems.innerHTML = "<p id='empty-msg'>Cart is empty. Add some items!</p>";
    totalLine.style.display = "none";
    custForm.style.display  = "none";
    return;
  }

  var rows     = "";
  var subtotal = 0;
  var totalQty = 0;

  for (var i = 0; i < cart.length; i++) {
    var item      = cart[i];
    var itemTotal = item.price * item.qty;
    subtotal      = subtotal + itemTotal;
    totalQty      = totalQty + item.qty;

    rows = rows +
      "<tr>" +
        "<td>" + item.name  + "</td>" +
        "<td>" + item.qty   + "</td>" +
        "<td>Rs. " + item.price + "</td>" +
        "<td>Rs. " + itemTotal  + "</td>" +
        "<td><button class='remove-btn' onclick='removeItem(" + i + ")'>Remove</button></td>" +
      "</tr>";
  }

  cartItems.innerHTML =
    "<table class='cart-table'>" +
      "<tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th><th>Action</th></tr>" +
      rows +
    "</table>";

  totalLine.style.display = "block";
  document.getElementById("cart-count").textContent    = totalQty;
  document.getElementById("cart-subtotal").textContent = "Rs. " + subtotal;
  custForm.style.display = "block";
}

function removeItem(index) {
  cart.splice(index, 1);
  showCart();
}

function clearCart() {
  cart = [];
  showCart();
  document.getElementById("bill-box").style.display = "none";
}

function generateBill() {
  var name  = document.getElementById("cust-name").value;
  var phone = document.getElementById("cust-phone").value;

  if (name == "") {
    alert("Please enter your name!");
    return;
  }

  var subtotal = 0;
  for (var i = 0; i < cart.length; i++) {
    subtotal = subtotal + (cart[i].price * cart[i].qty);
  }

  var gstAmount  = subtotal * GST_RATE;
  var grandTotal = subtotal + gstAmount;

  var billRows = "";
  for (var j = 0; j < cart.length; j++) {
    var item  = cart[j];
    var total = item.price * item.qty;
    billRows = billRows +
      "<tr>" +
        "<td>" + (j + 1)    + "</td>" +
        "<td>" + item.name  + "</td>" +
        "<td>" + item.qty   + "</td>" +
        "<td>Rs. " + item.price + "</td>" +
        "<td>Rs. " + total      + "</td>" +
      "</tr>";
  }

  var billBox = document.getElementById("bill-box");
  billBox.style.display = "block";

  billBox.innerHTML =
    "<h2>Invoice / Bill</h2>" +
    "<div class='bill-info'>" +
      "<b>Name:</b> " + name + "<br>" +
      "<b>Phone:</b> " + (phone || "N/A") +
    "</div>" +
    "<table class='bill-table'>" +
      "<tr><th>#</th><th>Product</th><th>Qty</th><th>Price</th><th>Amount</th></tr>" +
      billRows +
    "</table>" +
    "<div class='bill-row'><span>Subtotal</span><span>Rs. " + subtotal + "</span></div>" +
    "<div class='bill-row'><span>GST (18%)</span><span>Rs. " + gstAmount.toFixed(2) + "</span></div>" +
    "<div class='grand'>" +
      "<span>Grand Total</span>" +
      "<span>Rs. " + grandTotal.toFixed(2) + "</span>" +
    "</div>";

  billBox.scrollIntoView({ behavior: "smooth" });

  console.log("Name: " + name);
  console.log("Subtotal: " + subtotal);
  console.log("GST: " + gstAmount.toFixed(2));
  console.log("Grand Total: " + grandTotal.toFixed(2));
}
