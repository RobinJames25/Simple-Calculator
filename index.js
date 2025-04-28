let currentInput = '';
let previousInput = '';
let currentOperation = '';
let resultDisplayed = false;

const inputField = document.getElementById("field1");

function updateDisplay() {
    inputField.value = currentInput;
}

document.getElementById("one").addEventListener("click", () => {
 appendNumber(1)
})
document.getElementById("two").addEventListener("click", () => {
 appendNumber(2)
})
document.getElementById("three").addEventListener("click", () => {
 appendNumber(3)
})
document.getElementById("four").addEventListener("click", () => {
 appendNumber(4)
});
document.getElementById("five").addEventListener("click", () => {
 appendNumber(5)
});
document.getElementById("six").addEventListener("click", () => {
 appendNumber(6)
});
document.getElementById("seven").addEventListener("click", () => {
 appendNumber(7)
});
document.getElementById("eight").addEventListener("click", () => {
 appendNumber(8)
});
document.getElementById("nine").addEventListener("click", () => {
 appendNumber(9)
});
document.getElementById("zero").addEventListener("click", () => {
 appendNumber(0)
});

document.getElementById("plus").addEventListener("click", () => {
    chooseOperation('+')
});
document.getElementById("minus").addEventListener("click", () => {
    chooseOperation('-')
});
document.getElementById("multiply").addEventListener("click", () => {
    chooseOperation('*')
});
document.getElementById("divide").addEventListener("click", () => {
    chooseOperation('/')
});
document.getElementById("del").addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
});
document.getElementById("modulus").addEventListener("click", () => {
    chooseOperation('%');
})

document.getElementById("clr").addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    currentOperation = null;
    updateDisplay();
})

document.getElementById("submit").addEventListener("click", () => {
    if (currentInput === "" || previousInput === "" || currentOperation === null) return;
    calculate();
})

document.getElementById("period").addEventListener("click", () => {
    if (resultDisplayed){
        currentInput = "0.";
        resultDisplayed = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }
    updateDisplay();
}) 

document.getElementById("plus-minus").addEventListener("click", () => {
    if (currentInput) {
        if (currentInput.startsWith("-")){
            currentInput = currentInput.slice(1);
        } else {
            currentInput = "-" + currentInput;
        }
        updateDisplay();
    }
})
function appendNumber(number) {
    if(resultDisplayed) {
        currentInput = "";
        resultDisplayed = false;
    }
    currentInput += number;
    updateDisplay()
}

function chooseOperation(operation) {
    if (currentInput === "") return;
    if (previousInput !== "") {
        calculate();
    }
    currentOperation = operation;
    previousInput = currentInput;//flag
    currentInput = previousInput + " " + currentOperation + " ";//flag
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput.split(" ")[2]);//flag

    if (isNaN(prev) || isNaN(current)){
        currentInput = "Error";
        resultDisplayed = true;
        updateDisplay();
        return;
    }

    switch (currentOperation) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            if(current === 0) {
                currentInput = "Cannot divide by 0";
                resultDisplayed = true;
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        case "%":
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = previousInput + " " + currentOperation + " " + current + " = " + result;
    previousInput = "";
    currentOperation = null;
    resultDisplayed = true;
    updateDisplay();
}