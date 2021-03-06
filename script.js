const display = document.querySelector('.display');
const equalsButton = document.querySelector('.btn-equals');
const clearButton = document.querySelector('.btn-clear');
const pointButton = document.querySelector('.btn-dot');
const numButtons = document.querySelectorAll('.btn-num');
const operatorButtons = document.querySelectorAll('.btn-operator');

let displayValue = '0';
let firstNumber = 0;
let operator = '';

window.addEventListener('keydown', e => {
    console.log(e.key);
    const button = document.querySelector(`.btn[data-key="${e.key}"`);
    if(button) {
        button.click();
    }
});

numButtons.forEach(button => button.addEventListener('click', e => changeDisplay(e.target.innerHTML)));
operatorButtons.forEach(button => button.addEventListener('click', opClickHandler));
equalsButton.addEventListener('click', getResult);
clearButton.addEventListener('click', clearAll);
pointButton.addEventListener('click', addPoint);

function opClickHandler(event) {
    if(operator !== '' && displayValue !== 'error') {
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
    const result = isFloat(op) ? +op.toFixed(4) : op;
    firstNumber = result;
    operator = '';
    changeDisplay(null);
    changeDisplay(result.toString());
}

function changeDisplay(value) {
    if(value === null || value === NaN) {
        display.textContent = '0';
        displayValue = '0';
    }
    else if(value === 'error') {
        display.textContent = 'ERROR!!!';
        displayValue = 'error';
    }
    else if((display.textContent === '0' && value !== '.') || displayValue === 'error') {
        display.textContent = value;
        displayValue = value;
    }
    else if(displayValue === firstNumber.toString() && displayValue !== '0') {
        display.textContent = value;
        displayValue = value;
    }
    else {
        if(displayValue.length >= 12) {
            return;
        }
        display.textContent += value;
        displayValue += value;
    }
}

function clearAll() {
    firstNumber = 0;
    operator = '';
    changeDisplay(null);
}

function addPoint() {
    if(displayValue.includes('.')) {
        return;
    } else changeDisplay('.');
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