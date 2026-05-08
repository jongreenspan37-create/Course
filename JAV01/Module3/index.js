import {bankAccount} from './bankAccount.js';

//Create an account
const oneId = new bankAccount("Jon", "BY0001","password", 0)
console.log(oneId)
let openAcc = null;
//Create an account
const myForm = document.getElementById('accCreate');

myForm.addEventListener('submit', (e) =>{
    //stops form from sending to server
    e.preventDefault();

    //variable for class
    const nameValue = document.getElementById('name').value;
    const passValue = document.getElementById('pass').value;
    const accValue = createAccno();
    console.log(accValue);
    console.log(nameValue);
    console.log(passValue);
     
    //create new object from class
    openAcc = new bankAccount(nameValue,accValue,passValue,0);
    console.log(openAcc);
    displayAccount();
});

//generates a random account no
function createAccno(){
    let accNo=""
    for (let i = 0; i < 10; i++){
        accNo += Math.floor(Math.random() * 10);
    }
    return accNo;
}

//Displays account details and creates table entries
function displayAccount(){
    console.log(openAcc)
    const displayDiv = document.getElementById('account-details');
    if(openAcc){
    displayDiv.innerHTML = `<Strong>Name: </strong>${openAcc.name}<strong><span style = "margin-left:15px;" >Account No :</strong>${openAcc.account}</span>`;
    }
}