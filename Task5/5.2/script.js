// Task 5.2 – Find Max & Min from Array of Objects (user input)

function findMaxMin() {
  const input = document.getElementById("inputNumbers").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const resultDiv = document.getElementById("result");

  // Clear previous messages
  errorMsg.textContent = "";
  resultDiv.style.display = "none";

  // Validate input
  if (input === "") {
    errorMsg.textContent = "Please enter at least one number.";
    return;
  }

  // Convert input string to array of numbers (as objects)
  const rawValues = input.split(",");

  const numbersArray = rawValues.map((item, index) => {
    return {
      id: index + 1,
      value: Number(item.trim())
    };
  });

  // Check if any value is not a valid number
  const hasInvalid = numbersArray.some(obj => isNaN(obj.value));
  if (hasInvalid) {
    errorMsg.textContent = "Invalid input! Please enter numbers only, separated by commas.";
    return;
  }

  // Extract values using map()
  const values = numbersArray.map(obj => obj.value);

  // Find max and min using Math methods
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);

  // Log to console for understanding
  console.log("Array of Objects:", numbersArray);
  console.log("Extracted Values:", values);
  console.log("Max:", maxVal, "| Min:", minVal);

  // Show result in UI
  document.getElementById("arrDisplay").textContent = "[" + values.join(", ") + "]";
  document.getElementById("maxVal").textContent = maxVal;
  document.getElementById("minVal").textContent = minVal;
  resultDiv.style.display = "block";
}
