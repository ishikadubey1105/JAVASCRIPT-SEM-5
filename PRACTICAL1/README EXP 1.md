# Experiment No. 1

**Student Name:** Ishika Dubey
**PRN:** 24070521023
**File Path:** `Task 1/index.html` | `Task 1/website.html` | `Task 1/script.js`

---

## Experiment Title
Demonstration of Inline, Internal and External JavaScript, Console Methods and Uses Information Webpage

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

---

## Experiment Program Code

### `index.html` — SIT Nagpur Department Page (External JS)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SIT Nagpur - Department of Computer Science</title>
    <style>
        /* Full CSS in source file — dark-themed hero layout */
        body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #020617, #0f172a 55%, #1e3a8a);
            color: #e2e8f0;
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="panel">
            <div class="hero-content">
                <div>
                    <span class="badge">Case Study 1</span>
                    <h1>Department of Computer Science and Engineering</h1>
                    <p class="lead">Welcome to SIT Nagpur. Our department focuses on strong academic
                    foundations, practical laboratory learning, innovation, and student development.</p>
                    <div class="actions">
                        <a class="button button-primary" href="website.html">View Student Info Page</a>
                        <a class="button button-secondary" href="#about">Explore Department</a>
                    </div>
                    <div class="info-grid" id="about">
                        <div class="card"><h3>Vision</h3><p>To develop skilled, ethical graduates.</p></div>
                        <div class="card"><h3>Mission</h3><p>Quality education and modern computing.</p></div>
                        <div class="card"><h3>Facilities</h3><p>Smart classrooms and programming labs.</p></div>
                    </div>
                </div>
                <aside class="highlight">
                    <h2>Department Highlights</h2>
                    <ul>
                        <li>Experienced faculty members and mentor support.</li>
                        <li>Focus on web development, programming, and problem solving.</li>
                        <li>Industry-oriented mini projects and practical assignments.</li>
                        <li>Student clubs, coding events, and placement preparation.</li>
                    </ul>
                </aside>
            </div>
        </div>
    </section>
    <script src="script.js"></script>  <!-- EXTERNAL JavaScript -->
</body>
</html>
```

### `script.js` — External JavaScript (Console Methods Demo)
```js
function greet() {
    alert("Welcome to SIT NAGPUR");

    console.table([{ College: "SIT Nagpur", Course: "Computer Science" }]);
    console.time("Execution");
    console.timeEnd("Execution");
}
```

### `website.html` — Student Information Page (Internal JS + Inline JS)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SIT Nagpur - Student Information</title>
    <!-- INTERNAL JavaScript -->
    <script>
        function showWelcome() {
            const name = document.getElementById("name").value.trim();
            const age  = document.getElementById("age").value.trim();
            const out  = document.getElementById("output");

            if (!name || !age) {
                out.innerHTML = '<div class="error-box">Please fill in both Name and Age.</div>';
                return;
            }
            const ageNum = parseInt(age, 10);
            const year   = ageNum >= 21 ? "Final Year" : ageNum >= 20 ? "Third Year"
                         : ageNum >= 19 ? "Second Year" : "First Year";
            const today  = new Date().toLocaleDateString("en-IN",
                           { day:"2-digit", month:"short", year:"numeric" });

            out.innerHTML = `
                <div class="student-table-wrap">
                    <h2>Student Details</h2>
                    <table class="info-table">
                        <thead><tr><th>Field</th><th>Information</th></tr></thead>
                        <tbody>
                            <tr><td>Student Name</td><td><strong>${name}</strong></td></tr>
                            <tr><td>Age</td><td>${age} years</td></tr>
                            <tr><td>Institute</td><td>SIT Nagpur</td></tr>
                            <tr><td>Course</td><td>Computer Science &amp; Engineering</td></tr>
                            <tr><td>Year</td><td>${year}</td></tr>
                            <tr><td>Submitted On</td><td>${today}</td></tr>
                            <tr><td>Status</td><td><span class="badge">Registered</span></td></tr>
                        </tbody>
                    </table>
                </div>`;

            console.log("User Name: " + name);
            console.info("User Age: " + age);
            console.warn("Demo warning message.");
            console.error("Demo error message for console output practice.");
        }
    </script>
</head>
<body>
    <main class="wrapper">
        <section class="panel">
            <h1>Student Information</h1>
            <label for="name">Enter Name</label>
            <input type="text" id="name" placeholder="Enter student name">
            <label for="age">Enter Age</label>
            <input type="number" id="age" placeholder="Enter student age">

            <!-- INLINE JavaScript: onclick triggers both internal + external functions -->
            <button onclick="showWelcome(); greet();">Submit</button>

            <div id="output">
                <div class="placeholder">The submitted information will appear here.</div>
            </div>
            <a class="back-link" href="index.html">Back to Department Page</a>
        </section>
        <aside class="panel side-card">
            <h2>MADE BY ISHIKA DUBEY (24070521023)</h2>
        </aside>
    </main>
    <script src="script.js"></script>
</body>
</html>
```

---

## Output
- The SIT Nagpur department page loads with a dark-themed hero layout.
- Clicking **"View Student Info Page"** navigates to `website.html`.
- On entering Name and Age and clicking **Submit**:
  - An alert box displays `"Welcome to SIT NAGPUR"` (External JS triggered via inline `onclick`).
  - A student details table is dynamically generated (Internal JS).
  - Browser console shows output from: `console.log`, `console.info`, `console.warn`, `console.error`, `console.table`, `console.time`.





---

## Case Study Title
Making of a Student Information Webpage Connected to the SIT Nagpur Department Webpage using JavaScript

## Case Study Program Code
> All three JS types are used together in `website.html` and `script.js` (see above).

The case study demonstrates all three JavaScript inclusion methods in one project:

| Type | Where Used | Function |
|------|-----------|----------|
| **Inline JS** | `onclick="showWelcome(); greet();"` on Submit button | Triggers both functions |
| **Internal JS** | `<script>` block in `website.html` | `showWelcome()` — builds the student table |
| **External JS** | `script.js` linked via `<script src="">` | `greet()` — shows alert + console methods |

## Output
- Department homepage links to the student information page.
- On form submission: Welcome alert fires, student table is rendered dynamically, all console methods execute.
> **Screenshot:**
> <img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/3183ee50-c821-488f-bf45-dfa5c2fec37b" />
<img width="1917" height="983" alt="image" src="https://github.com/user-attachments/assets/22ff891f-2f81-4318-8f9b-ebbbed5431e8" />


---

## Result / Conclusion
The practical was performed successfully. Different methods of JavaScript — **Internal**, **Inline**, and **External** — were demonstrated along with all major console methods (`console.log`, `console.error`, `console.warn`, `console.info`, `console.table`, `console.time`). A student information webpage connected to the SIT Nagpur department page was created successfully.
