const display = document.querySelector('.display');
const numButtons = document.querySelectorAll('.num');

numButtons.forEach(button => button.addEventListener('click', changeDisplay));

let displayValue = '0';


function changeDisplay(event) {
    if(display.textContent === '0') display.textContent = event.target.innerHTML;
    else display.textContent += event.target.innerHTML;
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