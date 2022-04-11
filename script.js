let a = ''; // first number
let b = ''; // second number
let sign = ''; // operation sign
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', '+/-', '%'];

// display
const out = document.querySelector('.calc-screen p');

function allClear() {
    a = ''; // first number and result
    b = ''; // second number
    sign = ''; // sign
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = allClear;

document.querySelector('.calc-btns').onclick = (event) => {
    // button not pressed
    if (!event.target.classList.contains('calc-btn')) return;
    // button pressed allClear AC
    if (event.target.classList.contains('ac')) return;

    out.textContent = '';
    // get pressed button
    const key = event.target.textContent;

    // if the button is pressed 0-9 or .
    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        } else {
            b += key;
            out.textContent = b;
        }
        return
    }

    // if the sign is pressed "+", "-", "/", "X"
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        return
    }

    // if the pressed "="
    if (key === '=') {
        if(b === '') b = a;
        switch (sign) {

            case "+":
                a = (+a) + (+b);
                break;

            case "-":
                a = a - b;
                break;

            case "X":
                a = a * b;
                break;

            case "/":
                if (b === '0') {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return
                }
                a = a / b;
                break;

            case "+/-":
                a = -a;
                break;

            case "%":
                a = a / b * 100;
                break;
        }
        finish = true;
        out.textContent = a;
    }
}