// THE DISPLAY VALUE assigned to a variable for easy changing as required
let displayVal = document.getElementById("display-value");

let buttons = document.getElementsByTagName("input");
let clearButton = document.getElementById("clear-button");
let equalsButton = document.getElementById("equals-button");

let arrDisplay = [];

for(let button of buttons){
    button.addEventListener("click", ()=>{
        if(button.classList.contains("simple")){
            arrDisplay.push(button.value);
            
            let lastElement = arrDisplay[arrDisplay.length - 1];
            let secondLastElement = arrDisplay[arrDisplay.length - 2];
            if(((secondLastElement == '/' || secondLastElement == '*' || secondLastElement == '-' || secondLastElement == '+' || secondLastElement == '.') && (lastElement == '/' || lastElement == '*' || lastElement == '-' || lastElement == '+' || lastElement == '.'))
            || (arrDisplay.length > 8))
                arrDisplay.pop();

            let arrDisplayString = arrDisplay.join("");
            displayVal.innerHTML = arrDisplayString;
        }
        if(button === clearButton){
            displayVal.innerHTML = "0";
            arrDisplay.length = 0;
        }
    });
}