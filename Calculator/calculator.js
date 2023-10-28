// Define variables to keep track of the calculator state.
let currentInput = '';
let previousInput = '';
let operation = '';

// Get the screen element to display the result.
const screen = document.querySelector('.screen');

// Function to update the screen with the current input.
function updateScreen() {
  screen.innerText = currentInput;
}

// Function to handle number button clicks.
function appendNumber(number) {
  if (currentInput === '0' && number !== '0') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateScreen();
}

// Function to handle operation button clicks.
function setOperation(op) {
  if (currentInput !== '') {
    previousInput = currentInput;
    currentInput = '';
    operation = op;
  }
}

// Function to calculate the result.
function calculate() {
  if (previousInput !== '' && currentInput !== '') {
    switch (operation) {
      case '+':
        currentInput = (parseFloat(previousInput) + parseFloat(currentInput)).toString();
        break;
      case '−':
        currentInput = (parseFloat(previousInput) - parseFloat(currentInput)).toString();
        break;
      case '×':
        currentInput = (parseFloat(previousInput) * parseFloat(currentInput)).toString();
        break;
      case '÷':
        if (currentInput !== '0') {
          currentInput = (parseFloat(previousInput) / parseFloat(currentInput)).toString();
        } else {
          currentInput = 'Error';
        }
        break;
    }
    operation = '';
    previousInput = '';
    updateScreen();
  }
}

// Function to clear the calculator.
function clearCalculator() {
  currentInput = '';
  previousInput = '';
  operation = '';
  updateScreen();
}

// Event listeners for button clicks
const buttons = document.querySelectorAll('.calc-button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.innerText;

    if (!isNaN(buttonText) || buttonText === '.') {
      appendNumber(buttonText);
    } else if (['+', '−', '×', '÷'].includes(buttonText)) {
      setOperation(buttonText);
    } else if (buttonText === '=') {
      calculate();
    } else if (buttonText === 'C') {
      clearCalculator();
    } else if (buttonText === '←') {
      currentInput = currentInput.slice(0, -1);
      updateScreen();
    }
  });
});
