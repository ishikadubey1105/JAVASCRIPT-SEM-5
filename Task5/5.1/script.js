let cart = [];
let nextId = 1;

function getDiscountPercent(subtotal) {
  if (subtotal >= 1000) return 20;
  if (subtotal >= 500)  return 10;
  if (subtotal >= 200)  return 5;
  return 0;
}

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
    cart.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>₹${item.price.toFixed(2)}</td>
        <td>₹${item.subtotal.toFixed(2)}</td>
        <td><button class="del" onclick="removeItem(${item.id})">✕</button></td>
      `;
      tbody.appendChild(tr);
    });
  }

  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const discPct  = getDiscountPercent(subtotal);
  const discAmt  = (subtotal * discPct) / 100;
  const total    = subtotal - discAmt;

  document.getElementById("subtotal").textContent = `₹${subtotal.toFixed(2)}`;
  document.getElementById("total").textContent    = `₹${total.toFixed(2)}`;

  const discRow = document.getElementById("discRow");
  if (discAmt > 0) {
    discRow.style.display = "flex";
    document.getElementById("discLabel").textContent = `Discount (${discPct}% off)`;
    document.getElementById("discAmt").textContent   = `-₹${discAmt.toFixed(2)}`;
  } else {
    discRow.style.display = "none";
  }

  highlightTier(discPct);
}

function highlightTier(discPct) {
  const map = { 0: "t0", 5: "t1", 10: "t2", 20: "t3" };
  ["t0", "t1", "t2", "t3"].forEach(id => {
    document.getElementById(id).classList.remove("active-tier");
  });
  const activeId = map[discPct];
  if (activeId) document.getElementById(activeId).classList.add("active-tier");
}

function checkout() {
  if (cart.length === 0) { showMsg("Cart is empty!", "red"); return; }
  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const discPct  = getDiscountPercent(subtotal);
  const total    = subtotal - (subtotal * discPct / 100);
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
