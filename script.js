const display = document.querySelector('.display');
const equalsButton = document.querySelector('.equals');
const numButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');

let displayValue = '0';
let firstNumber = 0;
let operator = '';

numButtons.forEach(button => button.addEventListener('click', e => changeDisplay(e.target.innerHTML)));
operatorButtons.forEach(button => button.addEventListener('click', opClickHandler));
equalsButton.addEventListener('click', equalsClickHandler);

function opClickHandler(event) {
    operator = event.target.innerHTML;
    firstNumber = parseInt(displayValue);
    changeDisplay(null);
}

function equalsClickHandler() {
    const secondNumber = parseInt(displayValue);
    const result = operate(operator, firstNumber, secondNumber);
    changeDisplay(null);
    changeDisplay(result);
}

function changeDisplay(value) {
    if(value === null) {
        display.textContent = '0';
        displayValue = '0';
    }
    else if(display.textContent === '0') {
        display.textContent = value;
        displayValue = value;
    }
    else {
        display.textContent += value;
        displayValue += value;
    }
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            break;
    }
}