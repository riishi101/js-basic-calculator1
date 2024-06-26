// CALCULATOR PROGRAM

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let resetScreen = false;

const display = document.querySelector("#display");
const numButtons = document.querySelectorAll(".numButton");
const opButtons = document.querySelectorAll(".opButton");
const eqButton = document.querySelector(".eqButton");
const clearButton = document.querySelector(".clearButton");

// Added event listeners to number buttons to append the number to the display
numButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

// Added event listeners to operator buttons to store the first operand and set the current operator
opButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

// Added event listener to equal buttons to perform the calculation and display the result
eqButton.addEventListener("click", compute);

// Added event listener to clear button to clear all stored data and reset the display
clearButton.addEventListener("click", clear);

// Appended the clicked number to the display
function appendNumber(num) {
  if (resetScreen) {
    display.value = "";
    resetScreen = false;
  }
  if (display.value === "0" || display.value === "Error! Div by 0") {
    display.value = "";
  }
  display.value += num;
}

function setOperation(op) {
  if (currentOperator !== null) compute();
  firstOperand = display.value;
  currentOperator = op;
  resetScreen = true;
}

// Performed the calculation and display the result
function compute() {
  if (currentOperator === null) {
    displayError("No operator selected");
    return;
  }
  secondOperand = display.value;
  try {
    const result = operate(currentOperator, firstOperand, secondOperand);
    if (result === "Error! Div by 0") {
      displayError(result);
    } else {
      display.value = result;
      firstOperand = result;
      currentOperator = null;
    }
  } catch (error) {
    displayError("Calculation error");
  }
}

// Clears all stored data and reset the display
function clear() {
  display.value = "";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
  resetScreen = false;
}

// Displays an error message
function displayError(message) {
  display.value = message;
  resetScreen = true;
}

// Performs the selected operation on the two operands
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "/":
      return b === 0 ? "Error! Div by 0" : a / b;
    default:
      throw new Error("Unknown operator");
  }
}
