class Calculator {
    constructor(previousOperientButton, currentOperentButton) {
        this.previousOperientButton = previousOperientButton;
        this.currentOperentButton = currentOperentButton;
        this.clear();
    }

    clear() {
        this.currentOperent = "";
        this.previousOperient = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperent = this.currentOperent.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperent.includes('.')) return;
        this.currentOperent = this.currentOperent.toString() + number.toString();
    }

    choseOperation(operation) {
        if (this.currentOperent === '') return;
        if (this.previousOperient !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperient = this.currentOperent;
        this.currentOperent = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperient);
        const current = parseFloat(this.currentOperent);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperent = computation;
        this.operation = undefined;
        this.previousOperient = '';
    }

    updateDisplay() {
        this.currentOperentButton.innerText = this.currentOperent;
        this.currentOperentButton.style.color = "white";

        if (this.operation != null) {
            this.previousOperientButton.innerText = `${this.previousOperient} ${this.operation}`;
        } else {
            this.previousOperientButton.innerText = this.previousOperient;
        }
    }
}

const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operations]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperientButton = document.querySelector('[data-previous-operient]');
const currentOperentButton = document.querySelector('[data-current-operient]');

const calculator = new Calculator(previousOperientButton, currentOperentButton);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
