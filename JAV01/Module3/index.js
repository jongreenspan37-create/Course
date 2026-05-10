import {bankAccount} from './bankAccount.js';

//Create an account variable

let openAcc = null;


//Create an account from form
const myForm = document.getElementById('accCreate');

myForm.addEventListener('submit', (e) =>{
    //stops form from sending to server
    e.preventDefault();

    //variable for class
    const formData = new FormData(myForm);

    const accValue = createAccno(); //call function to generate random account no
    const name = formData.get('userName');
    const email = formData.get('userEmail');
    const password = formData.get('userPass');


    console.log(formData)

      
    console.log(accValue);
    
     
    
    //create new object from class
    openAcc = new bankAccount(name,email,accValue,password);
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
            <span style = "margin-left:15px;" >Account No :</strong>${openAcc.account}</span><span style = "margin-left:15px;"><strong>Balance :</strong> ${openAcc.balance}</span>`;
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

const changeBtn = document.getElementById('change');

changeBtn.addEventListener('click', ()=>{
    const changeDiv = document.getElementById('toggle');
    changeDiv.classList.toggle('state2');
});