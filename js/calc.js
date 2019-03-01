const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };


  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    font();
    display.value = calculator.displayValue;
  }

  
  const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("n-p")) {
   negPos();
    updateDisplay();
    return;
    }

    if (target.classList.contains("delete")){
      del();
      updateDisplay();
      return;
    }
  

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});


function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    // this is before the first operator is inputed
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // displays 0 before the second number is inputed, the first digit is added to 0 and displayed
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  // prevents decimal being pressed inbetween number enteries
  if (calculator.waitingForSecondOperand === true) return;
  // If the `displayValue` does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    
  }

  // arrow functions, shorthand for functions
  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '%': (firstOperand, secondOperand) => firstOperand % secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '=': (firstOperand, secondOperand) => secondOperand
  };


  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
   
  }


  function negPos() {
    if (!calculator.displayValue == 0) {
    calculator.displayValue *= -1;
    }
  
  return;
}

    function del() {
      if (calculator.displayValue === '0') {
        return;
      }

      if (calculator.displayValue.length == '1') {
        calculator.displayValue = calculator.displayValue.substr(0, calculator.displayValue.length - 1);
        calculator.displayValue = '0';
        return;
      }
    else {
      calculator.displayValue = calculator.displayValue.substr(0, calculator.displayValue.length - 1);
    return;
    }
     
    }
  
  function font() {

    if (calculator.displayValue.length < 10) {
      document.getElementById("display").style.fontSize = "5rem";
      return;
    }

    else if (calculator.displayValue.length < 15) {
      document.getElementById("display").style.fontSize = "4rem";
    }

    else {
      document.getElementById("display").style.fontSize = "3rem";
    }
  }
