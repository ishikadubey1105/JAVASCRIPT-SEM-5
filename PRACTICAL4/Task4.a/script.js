
function isPalindrome(word) {
  var reversed = word.split("").reverse().join("");
  return word === reversed;
}

var cleanWord = function (word) {
  return word.toLowerCase().replace(/[^a-z0-9]/g, "");
};

var showResult = (message) => {
  document.getElementById("error").innerText = "";
  document.getElementById("result").innerText = message;
};


function makeCounter() {
  var count = 0;
  return function () {
    count++;
    return count;
  };
}
var counter = makeCounter();


function checkPalindrome() {
  try {
    var input = document.getElementById("wordInput").value;

    if (input.trim() === "") {
      throw new Error("Please enter a word!");
    }

    var cleaned = cleanWord(input);
    var result = isPalindrome(cleaned);

    if (result) {
      showResult('"' + input + '" is a Palindrome! ');
    } else {
      showResult('"' + input + '" is NOT a Palindrome ');
    }

  } catch (error) {
    alert(error.message);

  }
}
