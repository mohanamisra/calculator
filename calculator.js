// THE DISPLAY VALUE assigned to a variable for easy changing as required
let displayVal = document.getElementById("display-value");

let buttons = document.getElementsByTagName("input");
let clearButton = document.getElementById("clear-button");
let equalsButton = document.getElementById("equals-button");
let percentageButton = document.getElementsByClassName("percentage-button")[0];

let arrDisplay = [];
let arrDisplayString;

for(let button of buttons){
    button.addEventListener("click", ()=>{
        //ONLY PRINTS IF THE BUTTON SUPPORTS PRINTING
        if(button.classList.contains("simple")){
            arrDisplay.push(button.value);
            
            let lastElement = arrDisplay[arrDisplay.length - 1];
            let secondLastElement = arrDisplay[arrDisplay.length - 2];
            if(((secondLastElement == '/' || secondLastElement == '*' || secondLastElement == '-' || secondLastElement == '+' || secondLastElement == '.') && (lastElement == '/' || lastElement == '*' || lastElement == '-' || lastElement == '+' || lastElement == '.')) || (arrDisplay.length > 10))
                arrDisplay.pop();

            arrDisplayString = arrDisplay.join("");
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
    });
}