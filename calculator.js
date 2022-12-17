// THE DISPLAY VALUE assigned to a variable for easy changing as required
let displayVal = document.getElementById("display-value");

let buttons = document.getElementsByTagName("input");
let clearButton = document.getElementById("clear-button");
let equalsButton = document.getElementById("equals-button");
let percentageButton = document.getElementsByClassName("percentage-button")[0];
let signButton = document.getElementsByClassName("sign-button")[0];
let deleteButton = document.getElementsByClassName("delete-button")[0];

let arrDisplay = [];
let arrDisplayString;
let finalArrDisplay = [];
let finalArrDisplayString;

let lastElement;
let secondLastElement;

for(let button of buttons){
    button.addEventListener("click", ()=>{
        //ONLY PRINTS IF THE BUTTON SUPPORTS PRINTING
        if(button.classList.contains("simple")){
            arrDisplay.push(button.value);
            
            lastElement = arrDisplay[arrDisplay.length - 1];
            secondLastElement = arrDisplay[arrDisplay.length - 2];
            //THIS PREVENTS TYPING SYMBOLS CONSECUTIVELY
            if(((secondLastElement == '/' || secondLastElement == '*' || secondLastElement == '-' || secondLastElement == '+' || secondLastElement == '.') && (lastElement == '/' || lastElement == '*' || lastElement == '-' || lastElement == '+' || lastElement == '.')) || (arrDisplay.length > 13)){
                arrDisplay.pop();
            }
            //THIS PREVENTS BEGINNING WITH SYMBOLS OTHER THAN +/-
            if(arrDisplay[0] == '*' || arrDisplay[0] == '/'){
                arrDisplay.shift();
            }

            arrDisplayString = arrDisplay.join("");
            if(arrDisplayString.length == 0){
                displayVal.innerHTML = "0";
            }
            else
                displayVal.innerHTML = arrDisplayString;
        }
        if(button === clearButton){
            displayVal.innerHTML = "0";
            arrDisplay.length = 0;
        }
        if(button === percentageButton && arrDisplay.length == 1){
            arrDisplay.pop();
            arrDisplay.push(displayVal.innerHTML/100);
            arrDisplayString = arrDisplay.join("");
            displayVal.innerHTML = arrDisplayString;
        }
        if(button === deleteButton){
            arrDisplayString = arrDisplayString.slice(0, -1); //REMOVING THE LAST CHARACTER, AKA DELETING OR BACKSPACING
            displayVal.innerHTML = arrDisplayString;
        }
        if(button === equalsButton){
            let a = createOperatingElements(arrDisplayString);
            let finalResult = operate(a.finalArrDisplay, a.symbols);
            displayVal.innerHTML = finalResult;
        }
    });
}

function createOperatingElements(arrDisplayString){
    finalArrDisplay = arrDisplayString.split(/[+-/*]/);
    if(arrDisplayString.charAt(0) == '-'){
        finalArrDisplay.splice(0, 1);
        finalArrDisplay[0] = -finalArrDisplay[0];
    }
    else if(arrDisplayString.charAt(0) == '+'){
        finalArrDisplay.splice(0, 1);
    }
    // if(finalArrDisplay[finalArrDisplay.length - 1] == '+' || finalArrDisplay[finalArrDisplay.length - 1] == '-' || finalArrDisplay[finalArrDisplay.length - 1] == '*' || finalArrDisplay[finalArrDisplay.length - 1] == '/'){
    //     finalArrDisplay.pop();
    // }
    console.log(finalArrDisplay);

    let symbols = [];
    for(let element of arrDisplayString){
        if(isNaN(element) && element != '.')
            symbols.push(element);
    }
    if(arrDisplayString.charAt(0) == '-'){
        symbols.shift();
    }
    else if(arrDisplayString.charAt(0) == '+'){
        symbols.shift();
    }
    // console.log(finalArrDisplay);
    console.log(symbols);

    // operate(finalArrDisplay, symbols);

    return {
        finalArrDisplay: finalArrDisplay,
        symbols: symbols,
    };
}

function operate(finalArrDisplay, symbols){
    let arrNumbers = Array.from(finalArrDisplay);
    let arrSymbols = Array.from(symbols);
    let result = arrNumbers[0];

    let numLength = arrNumbers.length;
    // let symbolsLength = arrSymbols.length;

    for(let i = 1; i < numLength; i++){
        let num1 = result;
        let num2 = arrNumbers[i];
        result = calculate(arrSymbols[i-1], num1, num2);
    }
    console.log(result);
    return result;
}

function calculate(symbol, n1, n2){
    n1 = parseInt(n1);
    n2 = parseInt(n2);
    switch(symbol){
        case '+':
            return n1+n2;
        case '-':
            return n1-n2;
        case '*':
            return n1*n2;
        case '/':
            return n1/n2;
    }
}