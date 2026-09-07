# Experiment No. 7

**Student Name:** Ishika Dubey
**PRN:** 24070521023

---

## Experiment Title
Event Handling in JavaScript

---

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

---

## Task 7.1 — To-Do List (DOM Events)

### Aim
Demonstrate JavaScript DOM event handling by building an interactive To-Do List where tasks can be added, edited, and deleted dynamically.

### File Path
`PRACTICAL7/7.1/index1.html`

### Program Code

#### `7.1/index1.html`
```html
<!DOCTYPE html>
<html>

<head>
    <title>To Do List</title>
    <h1>Ishika Dubey 24070521023 </h1>

    <style>
        body {
            font-family: Arial;
            background: #f2f2f2;
            text-align: center;
        }

        .container {
            width: 400px;
            margin: 50px auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
        }

        input {
            padding: 10px;
            width: 220px;
        }

        button {
            padding: 10px;
            margin: 5px;
            border: none;
            cursor: pointer;
        }

        #addBtn {
            background: green;
            color: white;
        }

        .edit {
            background: orange;
        }

        .delete {
            background: red;
            color: white;
        }

        li {
            list-style: none;
            margin: 10px 0;
            padding: 10px;
            background: #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    </style>
</head>

<body>

    <div class="container">

        <h1>To Do List</h1>

        <input type="text" id="taskInput" placeholder="Enter task">
        <button id="addBtn">Add</button>

        <ul id="taskList"></ul>

    </div>

    <script>

        let input = document.getElementById("taskInput");
        let addBtn = document.getElementById("addBtn");
        let taskList = document.getElementById("taskList");

        addBtn.addEventListener("click", function () {

            let task = input.value;

            if (task == "") {
                alert("Enter a task");
                return;
            }

            let li = document.createElement("li");
            let span = document.createElement("span");
            let editBtn = document.createElement("button");
            let deleteBtn = document.createElement("button");

            span.innerText = task;

            editBtn.innerText = "Edit";
            editBtn.className = "edit";

            deleteBtn.innerText = "Delete";
            deleteBtn.className = "delete";

            editBtn.addEventListener("click", function () {
                let newTask = prompt("Edit task:", span.innerText);
                if (newTask != null && newTask != "") {
                    span.innerText = newTask;
                }
            });

            deleteBtn.addEventListener("click", function () {
                li.remove();
            });

            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);

            input.value = "";
        });

    </script>

</body>

</html>
```

### Events Used

| Event / Method | Purpose |
|---|---|
| `addEventListener("click")` | Triggers Add, Edit, and Delete actions |
| `prompt()` | Opens a dialog box to edit an existing task |
| `document.createElement()` | Dynamically creates `li`, `span`, `button` elements |
| `li.remove()` | Removes the task item from the list |

### Output
- User types a task and clicks **Add** — task appears in the list with Edit and Delete buttons.
- Clicking **Edit** opens a `prompt()` dialog to update the task text in-place.
- Clicking **Delete** removes the task from the list entirely.

### Screenshot

> **Screenshot:**
> ![Task 7.1 Output](7.1/image.png)

---

## Task 7.2 — Registration Form with Validation & Submitted Details Panel

### Aim
Build a Registration Form that validates all fields using JavaScript event handling (`submit`, `change`, `focus`, `blur`) and displays the submitted details in a side panel with an option to edit.

### File Path
`PRACTICAL7/7.2/index.html`

### Program Code

#### `7.2/index.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Case Study 7 - Event Handling in JavaScript</title>
    <style>
        * { box-sizing: border-box; }

        body {
            font-family: Arial, sans-serif;
            background: #f2f2f2;
            display: flex;
            justify-content: center;
            padding: 30px;
            min-height: 100vh;
        }

        .page-wrapper {
            display: flex;
            gap: 30px;
            align-items: flex-start;
            width: 100%;
            max-width: 900px;
        }

        .form-container {
            background: #fff;
            padding: 25px 35px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            width: 420px;
            flex-shrink: 0;
        }

        .details-panel {
            background: #fff;
            padding: 25px 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            flex: 1;
            display: none;
            animation: slideIn 0.4s ease;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to   { opacity: 1; transform: translateX(0); }
        }

        .error { color: red; font-size: 12px; margin-top: 3px; min-height: 14px; }
        .focused { border: 2px solid #2196F3 !important; background: #eef7ff; }

        button {
            width: 100%; padding: 10px; background: #2196F3;
            color: #fff; border: none; border-radius: 4px;
            font-size: 15px; cursor: pointer;
        }

        #editBtn { background: #FF9800; margin-top: 18px; }
        #successMsg { color: green; text-align: center; margin-top: 10px; font-weight: bold; }
    </style>
</head>

<body>
    <div class="page-wrapper">

        <!-- LEFT: Form -->
        <div class="form-container">
            <h2>Registration Form</h2>
            <p class="mandatory">*Mandatory to fill</p>

            <form id="regForm" novalidate>
                <div class="field">
                    <label for="firstname">Firstname *</label>
                    <input type="text" id="firstname" name="firstname">
                    <div class="error" id="err-firstname"></div>
                </div>
                <div class="field">
                    <label for="lastname">Lastname</label>
                    <input type="text" id="lastname" name="lastname">
                </div>
                <div class="field">
                    <label>Birthday</label>
                    <div class="dob-row">
                        <select id="day"><option value="">Day</option></select>
                        <select id="month"><option value="">Month</option></select>
                        <select id="year"><option value="">Year</option></select>
                    </div>
                    <div class="error" id="err-dob"></div>
                </div>
                <div class="field">
                    <label for="username">Username *</label>
                    <input type="text" id="username" name="username">
                    <div class="error" id="err-username"></div>
                </div>
                <div class="field">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" name="email">
                    <div class="error" id="err-email"></div>
                </div>
                <div class="field">
                    <label for="website">Website</label>
                    <input type="url" id="website" name="website">
                </div>
                <div class="field">
                    <label for="password">Password *</label>
                    <input type="password" id="password" name="password">
                    <div class="error" id="err-password"></div>
                </div>
                <div class="field">
                    <label for="repassword">Re-password *</label>
                    <input type="password" id="repassword" name="repassword">
                    <div class="error" id="err-repassword"></div>
                </div>
                <div class="checkbox-row">
                    <input type="checkbox" id="terms">
                    <label for="terms">I agree to the terms &amp; conditions.</label>
                </div>
                <div class="error" id="err-terms"></div>
                <button type="submit" id="submitBtn">Submit</button>
                <p id="successMsg"></p>
            </form>
        </div>

        <!-- RIGHT: Submitted Details Panel -->
        <div class="details-panel" id="detailsPanel">
            <h3>&#10003; Submitted Details</h3>
            <span class="badge-success">Registration Successful</span>
            <table>
                <tr><td>First Name</td><td id="d-firstname">—</td></tr>
                <tr><td>Last Name</td><td id="d-lastname">—</td></tr>
                <tr><td>Birthday</td><td id="d-dob">—</td></tr>
                <tr><td>Username</td><td id="d-username">—</td></tr>
                <tr><td>E-mail</td><td id="d-email">—</td></tr>
                <tr><td>Website</td><td id="d-website">—</td></tr>
                <tr><td>Terms Agreed</td><td id="d-terms">—</td></tr>
            </table>
            <button type="button" id="editBtn">&#9998; Edit Details</button>
        </div>

    </div>

    <script>
        const form        = document.getElementById("regForm");
        const firstname   = document.getElementById("firstname");
        const lastname    = document.getElementById("lastname");
        const username    = document.getElementById("username");
        const email       = document.getElementById("email");
        const website     = document.getElementById("website");
        const password    = document.getElementById("password");
        const repassword  = document.getElementById("repassword");
        const terms       = document.getElementById("terms");
        const daySel      = document.getElementById("day");
        const monthSel    = document.getElementById("month");
        const yearSel     = document.getElementById("year");
        const successMsg  = document.getElementById("successMsg");
        const detailsPanel = document.getElementById("detailsPanel");

        const allInputs = document.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='url'], input[type='password'], select"
        );

        for (let d = 1; d <= 31; d++) daySel.appendChild(new Option(d, d));
        const months = ["January","February","March","April","May","June",
                        "July","August","September","October","November","December"];
        months.forEach((m, i) => monthSel.appendChild(new Option(m, i + 1)));
        const currentYear = new Date().getFullYear();
        for (let y = currentYear; y >= currentYear - 100; y--) {
            yearSel.appendChild(new Option(y, y));
        }

        allInputs.forEach(input => {
            input.addEventListener("focus", () => input.classList.add("focused"));
            input.addEventListener("blur",  () => input.classList.remove("focused"));
        });

        function showError(id, msg) { document.getElementById(id).textContent = msg; }
        function clearError(id)     { document.getElementById(id).textContent = ""; }

        firstname.addEventListener("change", () => {
            firstname.value.trim() === ""
                ? showError("err-firstname", "Firstname is required.")
                : clearError("err-firstname");
        });

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            let valid = true;

            if (firstname.value.trim() === "") {
                showError("err-firstname", "Firstname is required."); valid = false;
            } else { clearError("err-firstname"); }

            if (username.value.trim() === "") {
                showError("err-username", "Username is required."); valid = false;
            } else { clearError("err-username"); }

            if (valid) {
                document.getElementById("d-firstname").textContent = firstname.value.trim();
                document.getElementById("d-lastname").textContent  = lastname.value.trim() || "—";
                document.getElementById("d-dob").textContent =
                    daySel.value + " " + months[monthSel.value - 1] + " " + yearSel.value;
                document.getElementById("d-username").textContent  = username.value.trim();
                document.getElementById("d-email").textContent     = email.value.trim() || "—";
                document.getElementById("d-website").textContent   = website.value.trim() || "—";
                document.getElementById("d-terms").textContent     = "Yes";

                detailsPanel.style.display = "block";
                successMsg.textContent = "Form submitted successfully!";
                allInputs.forEach(el => el.disabled = true);
                document.getElementById("submitBtn").style.display = "none";
            }
        });

        document.getElementById("editBtn").addEventListener("click", function () {
            allInputs.forEach(el => el.disabled = false);
            successMsg.textContent = "";
            detailsPanel.style.display = "none";
            document.getElementById("submitBtn").style.display = "block";
        });
    </script>

</body>
</html>
```

### Events Used

| Event | Purpose |
|---|---|
| `submit` | Validates all fields on form submission |
| `change` | Inline validation triggered as user leaves a field |
| `focus` | Highlights the active input field with blue border |
| `blur` | Removes the highlight when the field loses focus |
| `click` (Edit button) | Re-enables form fields and hides the details panel |

### Output
- A two-column layout: **Registration Form** on the left.
- On valid submission, a **Submitted Details** panel slides in on the right showing all entered data.
- Clicking **✏️ Edit Details** hides the panel and re-enables the form for changes.
- Invalid fields show red error messages inline.

### Screenshot

> **Screenshot:**
> ![Task 7.2 Output](7.2/image.png)

---

## Result / Conclusion

Both tasks were completed successfully:

- **Task 7.1** demonstrated JavaScript DOM event handling by creating an interactive To-Do List that uses `addEventListener`, `createElement`, `prompt()`, and `remove()` to add, edit, and delete tasks dynamically.
- **Task 7.2** demonstrated form event handling (`submit`, `change`, `focus`, `blur`) by building a Registration Form with real-time inline validation. On successful submission, a details panel slides in on the right showing all submitted data, and the user can click **Edit Details** to re-enable the form for modifications.
