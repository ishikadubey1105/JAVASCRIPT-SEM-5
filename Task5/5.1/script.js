let cart = [];
let nextId = 1;

const DISCOUNT = 10;

function addItem() {
  const name  = document.getElementById("itemName").value.trim();
  const price = parseFloat(document.getElementById("itemPrice").value);
  const qty   = parseInt(document.getElementById("itemQty").value);

  if (!name || isNaN(price) || price < 0 || isNaN(qty) || qty < 1) {
    showMsg("Please fill in all fields correctly.", "red");
    return;
  }

  cart.push({ id: nextId++, name, price, qty, subtotal: price * qty });

  document.getElementById("itemName").value  = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemQty").value   = "1";

  showMsg("", "");
  render();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  render();
}

function render() {
  const tbody    = document.getElementById("cartBody");
  const emptyMsg = document.getElementById("emptyMsg");

  tbody.innerHTML = "";

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
    tbody.innerHTML = cart.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>₹${item.price.toFixed(2)}</td>
        <td>₹${item.subtotal.toFixed(2)}</td>
        <td><button class="del" onclick="removeItem(${item.id})">✕</button></td>
      </tr>
    `).join("");
  }

  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const discAmt  = (subtotal * DISCOUNT) / 100;
  const total    = subtotal - discAmt;

  document.getElementById("subtotal").textContent = `₹${subtotal.toFixed(2)}`;
  document.getElementById("discAmt").textContent  = `-₹${discAmt.toFixed(2)}`;
  document.getElementById("total").textContent    = `₹${total.toFixed(2)}`;
}

function checkout() {
  if (cart.length === 0) { showMsg("Cart is empty!", "red"); return; }
  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const total    = subtotal - (subtotal * DISCOUNT / 100);
  showMsg(`Order placed! Total paid: ₹${total.toFixed(2)}`, "green");
  cart = [];
  render();
}

function showMsg(text, color) {
  const el = document.getElementById("msg");
  el.textContent = text;
  el.style.color = color;
}

render();
