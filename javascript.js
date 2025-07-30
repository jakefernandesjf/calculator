// javascript.js

let userFirstNumber = "";
let userOperator = "";
let userSecondNumber = "";

let displayElement = document.querySelector(".display");

addButtonNumberCallbacks();

function addButtonNumberCallbacks() {
    let buttonNumberElements = document.querySelectorAll(".button-number");
    buttonNumberElements.forEach((button) => {
        button.addEventListener("click", () => {
            userFirstNumber += button.id.at(-1);
            updateDisplay(userFirstNumber);
        });
    });
}

function updateDisplay(text) {
    displayElement.textContent = text;
}


function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case ("+"):
            return add(firstNumber, secondNumber);
        case ("-"):
            return subtract(firstNumber, secondNumber);
        case ("*"):
            return multiply(firstNumber, secondNumber);
        case ("/"):
            return divide(firstNumber, secondNumber);
    }
}


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}