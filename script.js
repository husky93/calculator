const display = document.querySelector('.display');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const numButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');

let displayValue = '0';
let firstNumber = 0;
let operator = '';

numButtons.forEach(button => button.addEventListener('click', e => changeDisplay(e.target.innerHTML)));
operatorButtons.forEach(button => button.addEventListener('click', opClickHandler));
equalsButton.addEventListener('click', getResult);
clearButton.addEventListener('click', clearAll);

function opClickHandler(event) {
    if(operator !== '') {
        getResult();
        operator = event.target.innerHTML;
    }
    else {
        operator = event.target.innerHTML;
        firstNumber = displayValue === 'error' ? 0 : parseFloat(displayValue);
        changeDisplay(null);
    }
}

function getResult() {
    if(operator === ''){
        return;
    }
    const secondNumber = parseFloat(displayValue);
    const op = operate(operator, firstNumber, secondNumber);
    if(op === 'error') {
        changeDisplay(op);
        operator = '';
        firstNumber = 0;
        return;
    }
    const result = isFloat(op) ? op.toFixed(8) : op;
    firstNumber = result;
    operator = '';
    changeDisplay(null);
    changeDisplay(result);
}

function changeDisplay(value) {
    if(value === null || value === Infinity || value === NaN) {
        display.textContent = '0';
        displayValue = '0';
    }
    else if(value === 'error') {
        display.textContent = 'ERROR!!!';
        displayValue = 'error';
    }
    else if(display.textContent === '0' || displayValue === 'error') {
        display.textContent = value;
        displayValue = value;
    }
    else if(displayValue === firstNumber) {
        display.textContent = value;
        displayValue = value;
    }
    else {
        display.textContent += value;
        displayValue += value;
    }
}

function clearAll() {
    firstNumber = 0;
    operator = '';
    changeDisplay(null);
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
            return b === 0 ? 'error' : divide(a, b);
        default:
            break;
    }
}

function isFloat(num)  {
    return Number(num) === num && num % 1 !== 0;
}