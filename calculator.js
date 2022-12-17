// THE DISPLAY VALUE assigned to a variable for easy changing as required
let displayVal = document.getElementById("display-value");

let buttons = document.getElementsByTagName("input");
let clearButton = document.getElementById("clear-button");
let equalsButton = document.getElementById("equals-button");
let percentageButton = document.getElementsByClassName("percentage-button")[0];
let signButton = document.getElementsByClassName("sign-button")[0];

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
            if(((secondLastElement == '/' || secondLastElement == '*' || secondLastElement == '-' || secondLastElement == '+' || secondLastElement == '.') && (lastElement == '/' || lastElement == '*' || lastElement == '-' || lastElement == '+' || lastElement == '.')) || (arrDisplay.length > 10))
                arrDisplay.pop();

            arrDisplayString = arrDisplay.join("");
            displayVal.innerHTML = arrDisplayString;

            // finalArrDisplay = arrDisplayString.split(/[+-/*]/);
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
        if(button === equalsButton){
            let a = createOperatingElements(arrDisplayString);
            let finalResult = operate(a.finalArrDisplay, a.symbols);
            displayVal.innerHTML = finalResult;
        }
    });
}

function createOperatingElements(arrDisplayString){
    finalArrDisplay = arrDisplayString.split(/[+-/*]/);
    let symbols = [];
    for(let element of arrDisplayString){
        if(isNaN(element))
            symbols.push(element);
    }
    // console.log(finalArrDisplay);
    // console.log(symbols);

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