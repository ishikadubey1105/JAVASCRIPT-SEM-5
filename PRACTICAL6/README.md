# Experiment No. 6

**Student Name:** Ishika Dubey
**PRN:** 24070521023

---

## Experiment Title
String Methods and Regular Expressions in JavaScript

---

## Software / Tools Required
1. Visual Studio Code
2. Google Chrome
3. HTML5
4. JavaScript (ES6)

---

## Task 6.1 — String Methods & Regular Expressions

### Aim
Demonstrate JavaScript string methods (`split`, `match`, `replace`, `indexOf`, `reverse`) and Regular Expressions for text processing and email validation.

### File Path
`PRACTICAL6/6.1/index.html`

### Program Code

#### `6.1/index.html`
```html
<!DOCTYPE html>
<html>

<head>
    <title>String Methods and Regular Expressions</title>

    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 40px;
        }

        h1 { text-align: center; }

        .box {
            border: 1px solid #ccc;
            padding: 20px;
            margin-top: 20px;
            border-radius: 8px;
        }

        input, textarea, button {
            padding: 10px;
            margin: 5px 0;
            width: 90%;
        }

        button { width: 150px; cursor: pointer; }

        #output {
            margin-top: 20px;
            padding: 15px;
            background-color: #f5f5f5;
        }
    </style>
</head>

<body>

    <h1>String Methods &amp; Regular Expressions</h1>

    <div class="box">
        <label><b>Enter a paragraph:</b></label><br>
        <textarea id="paragraph" rows="5">JavaScript is a powerful programming language. It is widely used for web development.</textarea>
        <br>
        <label><b>Enter email:</b></label><br>
        <input type="text" id="email" placeholder="Enter your email">
        <br>
        <button onclick="ProcessString()">Process</button>
        <div id="output"></div>
    </div>

    <script>

        function ProcessString() {

            let paragraph = document.getElementById("paragraph").value;
            let email = document.getElementById("email").value;

            // split() - Split paragraph into words
            let words = paragraph.split(/\s+/);

            // match() - Find all vowels
            let vowels = paragraph.match(/[aeiou]/gi);
            let vowelCount = vowels ? vowels.length : 0;

            // replace() - Replace a word
            let replacedParagraph = paragraph.replace(
                /JavaScript/gi,
                "Javascript Programming"
            );

            // indexOf() - Search a word
            let searchWord = "powerful";
            let position = paragraph.indexOf(searchWord);

            // Email validation using Regex
            let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let emailResult = emailRegex.test(email) ? "Valid" : "Invalid";

            // Regex - Extract email from text
            let emailText = "For queries contact student@gmail.com";
            let extractedEmails = emailText.match(
                /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
            );

            // reverse() - Reverse paragraph
            let reversedParagraph = paragraph.split("").reverse().join("");

            // Display output
            document.getElementById("output").innerHTML = `
                <h3>1. Original Paragraph</h3>
                <p>${paragraph}</p>

                <h3>2. split() - Words</h3>
                <p>${words.join(", ")}</p>

                <h3>3. match() - Vowels</h3>
                <p>${vowels ? vowels.join(", ") : "No vowels found"}</p>

                <h3>4. Vowel Count</h3>
                <p>Total number of vowels: <b>${vowelCount}</b></p>

                <h3>5. replace() - Replaced Text</h3>
                <p>${replacedParagraph}</p>

                <h3>6. indexOf() - Search Word</h3>
                <p>Position of "<b>${searchWord}</b>": <b>${position}</b></p>

                <h3>7. Email Validation Using Regex</h3>
                <p>Email: <b>${email}</b><br>Result: <b>${emailResult}</b></p>

                <h3>8. Regex - Extracted Information</h3>
                <p>${extractedEmails ? extractedEmails.join(", ") : "No email found"}</p>

                <h3>9. reverse() - Reversed Paragraph</h3>
                <p>${reversedParagraph}</p>
            `;
        }

    </script>

</body>

</html>
```

### String Methods & Regex Used

| Method / Regex | Purpose |
|---|---|
| `split(/\s+/)` | Splits paragraph into individual words |
| `match(/[aeiou]/gi)` | Finds all vowels in the paragraph |
| `replace(/JavaScript/gi, ...)` | Replaces all occurrences of "JavaScript" |
| `indexOf("powerful")` | Finds the position of the word "powerful" |
| `split("").reverse().join("")` | Reverses the entire paragraph character by character |
| `/^[a-zA-Z0-9._%+-]+@.../` | Validates email address format using regex |
| `match(/.../g)` | Extracts all emails from a given text string |

### Output
- User enters a paragraph and an email address, then clicks **Process**.
- Results displayed include:
  1. Original paragraph
  2. Word list (via `split`)
  3. Vowels found and total vowel count (via `match`)
  4. Replaced text ("JavaScript" → "Javascript Programming")
  5. Index position of word "powerful"
  6. Email validation result (Valid / Invalid)
  7. Extracted email from a sample string
  8. Reversed paragraph

### Screenshot

> **Screenshot:**
> ![Task 6.1 Output](6.1/image.png)

---

## Task 6.2 — Student Information Extraction using Regular Expressions

### Aim
Use JavaScript Regular Expressions to extract structured student information (Name, Roll No., Email, Phone, Department) from raw text, validate email and phone formats, and apply string transformations (lowercase, replace).

### File Path
`PRACTICAL6/6.2/index1.html`

### Program Code

#### `6.2/index1.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Student Information using Regular Expressions</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            background: #fdf6f0;
            color: #3d3229;
            padding: 40px 20px;
        }

        .wrapper { max-width: 680px; margin: 0 auto; }

        .card {
            background: #ffffff;
            border-radius: 20px;
            padding: 28px 32px;
            box-shadow: 0 4px 24px rgba(140, 110, 80, 0.08);
            margin-bottom: 24px;
        }

        textarea {
            width: 100%; height: 170px; padding: 16px;
            font-size: 0.95rem; line-height: 1.7;
            background: #faf7f4; border: 2px solid #ece3d9;
            border-radius: 14px; resize: vertical; outline: none;
        }

        .btn {
            width: 100%; margin-top: 20px; padding: 15px 0;
            font-size: 1rem; font-weight: 600; color: #fff;
            background: linear-gradient(135deg, #d4a574, #c4876e);
            border: none; border-radius: 14px; cursor: pointer;
        }

        .badge.valid  { background: #e6f7ee; color: #1d8348; }
        .badge.invalid { background: #fdeaea; color: #c0392b; }
    </style>
</head>

<body>

    <div class="wrapper">
        <div class="header">
            <h1>Student Information Extraction</h1>
            <p>Paste student details below and let regex do the magic</p>
        </div>

        <div class="card">
            <label for="inputText">Student Data</label>
            <textarea id="inputText">Student Name: Ishika Dubey
Roll Number: 23
Email Address: ishika.dubey@gmail.com
Phone Number: 9876543210
Department: Computer Science</textarea>

            <button class="btn" onclick="processText()">Process Information</button>
        </div>

        <div id="result"></div>
    </div>

    <script>

        function processText() {

            let text = document.getElementById("inputText").value;

            let studentName = text.match(/Student Name:\s*([A-Za-z ]+)/i);
            let rollNumber  = text.match(/Roll Number:\s*(\d+)/i);
            let email       = text.match(/Email Address:\s*([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/i);
            let phone       = text.match(/Phone Number:\s*(\d+)/i);
            let department  = text.match(/Department:\s*(.+)/i);

            studentName = studentName ? studentName[1].trim() : "Not Found";
            rollNumber  = rollNumber  ? rollNumber[1].trim()  : "Not Found";
            email       = email       ? email[1].trim()       : "Not Found";
            phone       = phone       ? phone[1].trim()       : "Not Found";
            department  = department  ? department[1].trim()  : "Not Found";

            let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            let emailValid  = emailRegex.test(email);
            let emailStatus = emailValid
                ? '<span class="badge valid">Valid</span>'
                : '<span class="badge invalid">Invalid</span>';

            let phoneRegex = /^\d{10}$/;
            let phoneValid  = phoneRegex.test(phone);
            let phoneStatus = phoneValid
                ? '<span class="badge valid">Valid — 10 digits</span>'
                : '<span class="badge invalid">Invalid — Must be 10 digits</span>';

            let words          = text.trim().match(/\S+/g);
            let totalWords     = words ? words.length : 0;
            let totalCharacters = text.replace(/\s/g, "").length;
            let lowerText      = text.toLowerCase();
            let replacedText   = text.replace(/Computer Science/gi, "Information Technology");

            document.getElementById("result").innerHTML = `
                <div class="card">
                    <b>Name:</b> ${studentName} &nbsp;|&nbsp;
                    <b>Roll No.:</b> ${rollNumber} &nbsp;|&nbsp;
                    <b>Email:</b> ${email} ${emailStatus} &nbsp;|&nbsp;
                    <b>Phone:</b> ${phone} ${phoneStatus} &nbsp;|&nbsp;
                    <b>Department:</b> ${department}
                </div>
                <div class="card">
                    <b>Words:</b> ${totalWords} &nbsp;|&nbsp;
                    <b>Characters:</b> ${totalCharacters}
                </div>
                <div class="card">
                    <b>Lowercase:</b><br>${lowerText}
                </div>
                <div class="card">
                    <b>After Replace:</b><br>${replacedText}
                </div>
            `;
        }

    </script>

</body>
</html>
```

### Regex Patterns Used

| Pattern | Purpose |
|---|---|
| `/Student Name:\s*([A-Za-z ]+)/i` | Extracts student name from text |
| `/Roll Number:\s*(\d+)/i` | Extracts roll number digits |
| `/Email Address:\s*([A-Za-z0-9._%+-]+@...)/i` | Extracts email address |
| `/Phone Number:\s*(\d+)/i` | Extracts phone number |
| `/Department:\s*(.+)/i` | Extracts department name |
| `/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/` | Validates email format |
| `/^\d{10}$/` | Validates phone is exactly 10 digits |
| `/\S+/g` | Counts total words (non-whitespace tokens) |
| `/\s/g` | Strips whitespace for character count |
| `/Computer Science/gi` | Replaces department name in text |

### Output
- User pastes raw student text and clicks **Process Information**.
- Extracted fields displayed: Name, Roll No., Email, Phone, Department.
- Email and Phone show **Valid / Invalid** badges.
- Text statistics shown: total Words and Characters.
- Lowercase and department-replaced versions of the text are displayed below.

### Screenshot

> **Screenshot:**
> ![Task 6.2 Output](6.2/image.png)

---

## Result / Conclusion

Both tasks were completed successfully:

- **Task 6.1** demonstrated JavaScript string methods (`split`, `match`, `replace`, `indexOf`, `reverse`) and Regular Expressions for text processing, vowel counting, word splitting, email validation, and email extraction from a paragraph.
- **Task 6.2** demonstrated advanced Regex usage by extracting structured student information (Name, Roll No., Email, Phone, Department) from raw unstructured text, validating email and phone formats using regex patterns, and applying string transformations including lowercase conversion and keyword replacement.
