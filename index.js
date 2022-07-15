
const display = document.getElementById("display")
const operatorBtns = document.getElementsByClassName("calculations")
const numberBtns = document.getElementsByClassName("numbers"); 
let displayVal = [0]
let isEmpty = true

const equalHandler = () => {
    calculate(displayVal)
}

const equalBtn = document.getElementById("equal").addEventListener("click", equalHandler)
const clearBtn = document.getElementById("clear").addEventListener("click", clear)


function populate(input) {
    isEmpty ? displayVal = [input] : displayVal.push(input)
    isEmpty = false
    console.log(displayVal)
    display.textContent = displayVal.join("")
}

function add(a, b) {
    return(Number(a) + Number(b))
    console.log("add")
}

function subtract(a, b) {
    return (a-b)
    console.log("subtract")
}

function multiply(a, b) {
    return (a*b)
    console.log("multiply")
}

function divide(a, b) {
    return (a/b)
    console.log("divide")
} 

for (var i = 0; i < numberBtns.length; i++) {
    numberBtns[i].addEventListener("click", (e) => {
        let target = e.target.textContent
        populate(target)
    });
}

for (var i = 0; i < operatorBtns.length; i++) {
    operatorBtns[i].addEventListener("click", (e) => {
        isEmpty = false
        target = e.target.textContent
        populate(target)
    });
}

function calculate(array) {
    
    const catArray = reformat(array)
    console.log(catArray)

    for (let i = 0; i < catArray.length; i++) {
        let num = 0
        let calcDone = false

        if (catArray[i] == "*" && calcDone === false) {
            catArray[i-1] = multiply(catArray[i-1], catArray[i+1])
            catArray.splice(i, 2)
            i = 0

        } else if (catArray[i] == "/" && calcDone === false) {
            catArray[i-1] = divide(catArray[i-1], catArray[i+1])
            catArray.splice(i, 2)
            i = 0

        } else  {
            calcDone = true
        }

        if (catArray[i] == "+" && calcDone === true) {
            catArray[i-1] = add(catArray[i-1], catArray[i+1])
            catArray.splice(i, 2)
            i = 0

        } else if (catArray[i] == "-" && calcDone === true) {
            catArray[i-1] = subtract(catArray[i-1], catArray[i+1])
            catArray.splice(i, 2)
            i = 0
        }
       
    }

    isEmpty = true
    displayVal = catArray
    display.textContent = displayVal.join("")
}

function clear() {
    displayVal = []
    populate(0)
    isEmpty = true
}

function reformat(array) {
    const mapped = array.map((x) => {
    if (isNaN(parseInt(x, 10))) {
    	return(x)
    } else {
    	return(parseInt(x, 10))
    }
    })
    
    let stored = []
    let num = ""
    for (let i = 0; i < mapped.length; i++) {
    
        if (typeof(mapped[i]) == "number") {
            num += mapped[i]
            
            if (i == (mapped.length-1)) {
              stored.push(num)
			 }
           
        }  else {
            stored.push(num)
            stored.push(mapped[i])
            num = ""
        } 
    }
    return(stored)
}