import {bankAccount} from './bankAccount.js';

//Create an account variable

let openAcc = null;


//Create an account from form
const myForm = document.getElementById('accCreate');

myForm.addEventListener('submit', (e) =>{
    //stops form from sending to server
    e.preventDefault();

    //variable for class
    const nameValue = document.getElementById('name').value;
    const passValue = document.getElementById('pass').value;
    
    //Validate inputs
    if(nameValue.trim().length === 0 || passValue.trim().length === 0){
        console.log("No name added")
        return;
    }


    
    const accValue = createAccno(); //call function to generate random account no
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
    return Math.random().toString().slice(2,12).padEnd(9,'0');
}

//Displays account details and creates table entries
function displayAccount(){
    console.log(openAcc)
    const displayDiv = document.getElementById('account-details');
    if(openAcc){
    displayDiv.innerHTML = `<Strong>Name: </strong>${openAcc.name}<strong>
            <span style = "margin-left:15px;" >Account No :</strong>${openAcc.account}</span>`;
    }
}

const passInput = document.getElementById('pass');
const toggleIcon = document.getElementById('pass-toggle');

// Show password on hover
toggleIcon.addEventListener('mouseenter', () => {
    passInput.type = 'text';
    toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
});

// Hide password when mouse leaves
toggleIcon.addEventListener('mouseleave', () => {
    passInput.type = 'password';
    toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
});