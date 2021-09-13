let moneyElement = document.getElementById("money")
let bankElement = document.getElementById("bank")
let money = 0;
let bank = 0;
let loanAmount = 0;


//DOM of computer related elements.
let computersElement = document.getElementById("computers")
let specsElement = document.getElementById("specs")
let imageElement = document.getElementById("image")
let payElementBtn = document.getElementById("pay")
let priceElement = document.getElementById("price")

//Empty array with name Computers, contains computers retrieved from the API
let computers = [];
let selectedComputer;

let loanElement = document.getElementById("loan")
let loanTitleElement = document.getElementById("loanTitle")


//Retrieves data from the KOMPUTER-STORE api
fetch('https://noroff-komputer-store-api.herokuapp.com/computers')
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToList(computers));

//For each computer retrieved from the API add that computer to a list.
const addComputersToList = (computers) => {
    computers.forEach(comp => addComputerToList(comp));
}

//Creates the Option tag in the Drop down select menu
const addComputerToList = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}

//Adding the event listener for when the user selects a computer.
computersElement.addEventListener("change", changeComputer)
function changeComputer(){
    resetValue()
    const computer = computers[this.value -1]

    let img = document.createElement("img")
    img.src = "https://noroff-komputer-store-api.herokuapp.com/" + computer.image;
    img.onerror = function() {
        img.src = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
    }
    imageElement.appendChild(img)
    computer.specs.forEach(feature =>{
        let tag = document.createElement("p")
        tag.innerText = feature;
        tag.style.fontSize = "0.8rem"
        specsElement.appendChild(tag)
    })
    priceElement.innerText = computer.price;
    selectedComputer = computer;
}

payElementBtn.addEventListener("click", buy)

function buy(){

    if (bank >= selectedComputer.price){
        bank = bank - selectedComputer.price
        bankElement.innerText = bank
        alert("Congratulation you just got yourself a " + selectedComputer.title)
    }else{
        alert("You need more dollars, maby idk work some more???")
    }
}

//Work stuff
function work() {
    money +=100
    moneyElement.innerText = money

}
//
function addToBank() {
    if(loanAmount > 0){
        let bankT = money * 0.9
        bank += bankT

        let down = money - bankT
        loanAmount -= down;
        money = 0

    }else{
        bank += money
        money = 0
    }

    moneyElement.innerText = money
    bankElement.innerText = bank
    loanElement.innerText = loanAmount
}

//Loan Stuff

function loan(){
    let amount = parseInt(prompt("Enter loan amount: "));
    if (amount < money *2) {
        loanAmount = amount
        bank = bank + amount
        bankElement.innerText = bank
        loanTitleElement.style.display = "block"
        loanElement.innerText = loanAmount
        loanElement.style.display = "block"
    }else{
        alert("The amount of money you are trying to loan is to damn high. Maby work some more?")
    }
}

//reset value for Computer
function resetValue(){
    specsElement.innerHTML = "";
    imageElement.innerHTML = "";
    while(specsElement.firstChild){ specsElement.removeChild(specsElement.firstChild)}
    while(imageElement.firstChild){ imageElement.removeChild(imageElement.firstChild)}
}