// javascript.js


const MAX_DIGITS_DISPLAY = 8;
const OVERFLOW_ERROR_MSG = "Overflow Err"
let userFirstNumber = "";
let userOperator = "";
let userSecondNumber = "";
let inputToFirstNumber = true;

const displayElement = document.querySelector(".display");

addButtonNumberCallbacks();
addOperatorCallbacks();


/*
Callback Functions
*/
function addButtonNumberCallbacks() {
    const buttonNumberElements = document.querySelectorAll(".button-number");
    buttonNumberElements.forEach((button) => {
        button.addEventListener("click", () => {
            let digit = button.id.at(-1);
            if (inputToFirstNumber && 
                (getNumberOfDigitsOfInt(userFirstNumber) < MAX_DIGITS_DISPLAY)
            ){
                userFirstNumber += digit;
                updateDisplay(userFirstNumber);
            } else if (!inputToFirstNumber && 
                (getNumberOfDigitsOfInt(userSecondNumber) < MAX_DIGITS_DISPLAY)
            ){
                userSecondNumber += digit;
                updateDisplay(userSecondNumber);
            }
        });
    });
}

function addOperatorCallbacks() {
    const buttonOperatorElements = document.querySelectorAll(".button-operator");
    buttonOperatorElements.forEach((button) => {
        button.addEventListener("click", () => {
            switch (button.id) {
                case ("button-divide"):
                    evaluateExpression();
                    userOperator = "/";
                    break;
                case ("button-multiply"):
                    evaluateExpression();
                    userOperator = "*";
                    break;
                case ("button-subtract"):
                    evaluateExpression();
                    userOperator = "-";
                    break;
                case ("button-add"):
                    evaluateExpression();
                    userOperator = "+";
                    break;
                case ("button-equals"):
                    evaluateExpression();
                    break;
                case ("button-ac"):
                    reset();
                    break;
            }
        });
    });
}


/*
Helper Functions
*/
function updateDisplay(text) {
    displayElement.textContent = text;
}

function evaluateExpression() {
    if (userFirstNumber == "") {
        return;
    }
    if (userSecondNumber == "") {
        inputToFirstNumber = false;
        return;
    }
    let result = operate(
        userOperator,
        Number(userFirstNumber),
        Number(userSecondNumber)
    );
    if (result == OVERFLOW_ERROR_MSG) {
        userFirstNumber = "";
        userSecondNumber = "";
        inputToFirstNumber = true;
    } else {
        userFirstNumber = result;
        userSecondNumber = "";
        inputToFirstNumber = false;
    }
    updateDisplay(result);
}

function reset() {
    userFirstNumber = "";
    userSecondNumber = "";
    userOperator = "";
    updateDisplay("0");
    inputToFirstNumber = true;
}


/*
Math Functions
*/
function operate(operator, firstNumber, secondNumber) {
    let result;
    switch (operator) {
        case ("+"):
            result = add(firstNumber, secondNumber);
            break;
        case ("-"):
            result = subtract(firstNumber, secondNumber);
            break;
        case ("*"):
            result = multiply(firstNumber, secondNumber);
            break;
        case ("/"):
            result = divide(firstNumber, secondNumber);
            break;
    }
    if ((result == Infinity)
        || (getNumberOfDigitsOfInt(result) > MAX_DIGITS_DISPLAY)
    ) {
        return OVERFLOW_ERROR_MSG;
    } else {
        return roundNumber(result);
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

function roundNumber(number) {
    let decimalPlaces = MAX_DIGITS_DISPLAY - getNumberOfDigitsOfInt(number);
    return (Math.round(number * Math.pow(10, decimalPlaces))
        / Math.pow(10, decimalPlaces)
    );
}

function getNumberOfDigitsOfInt(number) {
    return number.toString().split(".")[0].length;
}