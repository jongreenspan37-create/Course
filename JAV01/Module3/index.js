import {BankAccount} from './bankAccount.js';

//Create an account variable

let openAcc = null;
const accountDetails = document.getElementById('account-details');
const transactionForm = document.getElementById('transaction-form')
const transAction = document.getElementById('transaction-actions')
const myHint = document.getElementById('hint-btn');
const hints = document.querySelectorAll('.hint');
const accCreate = document.getElementById('account-create');
const tableBody = document.getElementById('table-body');
const errMsg = document.getElementById('error-message');
const transAmount = document.getElementById('transaction');
const logOut = document.getElementById('logout');
const changeBtn = document.getElementById('change');
const accountTable = document.getElementById('account-table');
const passCheck =document.getElementById('pass-check');
const passCheckInput = document.getElementById('pass-check-input');


//Mouse events on password eye
const passInput = document.getElementById('pass');
const toggleIcon = document.getElementById('pass-toggle');


//generates a random account no
function createAccno(){
    return Math.random().toString().slice(2,12).padEnd(9,'0');
}

//Displays account details and creates table entries
function displayAccount(openAccount){
    console.log("this is running" + openAcc)
    
    if(openAcc){
        transactionForm.classList.remove('bankform-hide');
        
        accountDetails.innerHTML = `<Strong>Name: </strong>${openAcc.name}<strong>
            <span style = "margin-left:15px;" >Account No :</strong>${openAcc.account}
            </span><span style = "margin-left:15px;">
            <strong>Balance :</strong> ${openAcc.balance}</span>`;
            console.log(openAcc.balance);
    }
}

//takes different messages for amount input
function errMessage(message){
        errMsg.classList.remove('err-hide');
        errMsg.innerText = message;
        setTimeout(()=>{
            errMsg.classList.add('err-hide')},2000);
        
    }

//Show Hints
myHint.addEventListener('click',()=>{
    hints.forEach(div =>{
        div.classList.toggle('show-hint')
    })
});

//Creates an account
accCreate.addEventListener('submit', (e) =>{
    //stops form from sending to server
    e.preventDefault();

    //variable for class
    const formData = new FormData(accCreate);

    const accValue = createAccno(); //call function to generate random account no
    const name = formData.get('userName');
    const email = formData.get('userEmail');
    const password = formData.get('userPass');

    console.log(formData)
    console.log(accValue);
    
    //create new object from class
    openAcc = new BankAccount(name,email,accValue,password,0);
    console.log(openAcc);
    displayAccount(openAcc);
    accCreate.style.display = 'none';
    logOut.style.display = 'flex';
    transactionForm.classList.remove('bankform-hide');
    accountDetails.classList.remove('bankform-hide');
    accountTable.classList.remove('bankform-hide');
});

//Catch Enter Key
transactionForm.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        errMessage("Please use the Deposit or Withdraw buttons");
    }
});

//Submit a transaction
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    
    const action = e.submitter.value;
    console.log(action);
    
    
    
    const result = openAcc.addTransaction(transAmount.value, action);

    console.log(result.success);
    
    if(result.success === false){
        errMessage(result.message)
        return;
    }

    if(action==='withdraw' && passCheckInput.value === ''){
        console.log("new check " + action);
        passCheck.classList.remove('bankform-hide');
        transAmount.style.display = 'none';
        passCheckInput.style.display = 'inline-block';
        errMessage("Verify password");

        return;
    }

    if(action==='withdraw' && passCheckInput.value !== ''){
        if (passInput.value !== passCheckInput.value){
            errMessage("Password does not match")
            return;
        }
    }

    console.log(result.entry);

    const newRow = tableBody.insertRow(0);

    const dateCell = newRow.insertCell(0);
    const typeCell = newRow.insertCell(1);
    const amountCell = newRow.insertCell(2);
    const balanceCell = newRow.insertCell(3);

    const localDate = new Date(result.entry.date).toLocaleString();

    dateCell.textContent = localDate;
    typeCell.textContent = result.entry.type.toUpperCase();
    amountCell.textContent = `£${result.entry.amount.toFixed(2)}`;
    balanceCell.textContent = `£${openAcc.balance.toFixed(2)}`;

    typeCell.classList.add(`action-${result.entry.type}`);
    amountCell.classList.add(result.entry.type === 'deposit' ? 'text-green' : 'text-red');
    
    displayAccount(openAcc);
    console.log(transAmount);
    transAmount.value = null;
   
});


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

logOut.addEventListener('click',()=>{

        tableBody.innerHTML='';
        openAcc = null;

        
        accCreate.style.display = '';
        logOut.style.display = 'none';
        accountTable.classList.add('bankform-hide');
        accountDetails.classList.add('bankform-hide');
        transactionForm.classList.add('bankform-hide');

        accCreate.reset();

})

changeBtn.addEventListener('click', ()=>{
    const changeDiv = document.getElementById('toggle');
    changeDiv.classList.toggle('state2');
});

