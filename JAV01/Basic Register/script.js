import {Account} from "./class.js"

//DOM values
const accountAll = []
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const registeredUsers = document.getElementById('registered-users-list')

//EVENT LISTNERS

registerForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const title = document.getElementById('register-title').value;
    const firstName = document.getElementById('register-firstname').value.trim();
    const surname = document.getElementById('register-surname').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const newNav = document.getElementById('nav-menu');
    
    

     // Select our message placeholders
    const emailErrorSlot = document.getElementById('register-email-error');

    // Reset old error messages before running a new check
    emailErrorSlot.textContent = "";
    emailErrorSlot.style.display = "none";

    // 1. Check for duplicates
    const emailExists = accountAll.some(account => account.email === email);

    if (emailExists) {
        
        emailErrorSlot.textContent = "This email address is already registered.";
        emailErrorSlot.style.display = "block"; // Make the error visible
        document.getElementById('register-email').style.borderColor = "#ef4444";
       
               setTimeout(()=>{
            emailErrorSlot.style.display = "none"
        },2000);
        return;
        
    }

    const newAccount = new Account(title,firstName,surname,email,password);

    accountAll.push(newAccount);
    console.log(accountAll)
     registeredUsers.innerHTML =" ";
    registerForm.reset();
    
    
    accountAll.forEach((user)=> {
    // 1. Create a temporary HTML structure string for a single user card
    // Note: We use user.getFullName() which we defined in your class file!
    const userCardHtml = `
        <div class="user-display-card" style="border: 1px solid #cbd5e1; padding: 1rem; margin-bottom: 0.5rem; border-radius: 4px;">
            <p><strong>Name:</strong> ${user.getFullName()}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            
        </div>
    `;

    // 2. Append this new card into the inner HTML target slot
    registeredUsers.innerHTML += userCardHtml;
    
    
    
});

const newLi = document.createElement('li');
    newNav.append(newLi);
    newLi.classList = 'nav-item';
    newLi.textContent = "login";

    


})