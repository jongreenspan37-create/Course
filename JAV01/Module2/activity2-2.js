//Basic Function to change text
function changeText(){
    const myHeader = document.getElementById('heading')
    myHeader.innerText = "I changed the heading using Javascript using an onclick event and innerText";
}

//Basic function to chage text and add html
function changeHeader(){
    const myHeader = document.getElementById('heading');
    myHeader.innerHTML = "<strong>I used innerHTML to change the heading using Javascript and an onclick event</strong>"

}

//Process to create an element take an input and add the result
const btnOne = document.getElementById('btn1');
const newNumbers = document.createElement('div')
const newArray = document.createElement('div')
const myInput = document.getElementById('my-input');
const myNumDiv = document.getElementById('numbercheck');
const myArrayDiv = document.getElementById('arrayresults')

console.log(myNumDiv);

//myDiv.insertAdjacentElement('afterend',myElement);
myNumDiv.after(newNumbers);
newNumbers.className = "newdiv";
newNumbers.innerHTML= "<em>This will be the input result<em>";

myArrayDiv.after(newArray);
newArray.className = "newdiv";
newArray.innerHTML= "<em>This will be the array result<em>";


//if user has triggered error input box color disappears when typing
myInput.addEventListener('input',()=>{
    myInput.classList.remove('errorinput');
});

//Events when choose button is clicked
btnOne.addEventListener('click', ()=>{
    
    const myValue = Number(myInput.value);
    console.log(myValue)
    
    //Validation check is it an integer or less han zero or greater than 10
    if(!Number.isInteger(myValue) || myValue < 1 || myValue >10){
        newNumbers.textContent = "Please enter a whole number between 1 and 10";
        myInput.classList.add('errorinput');
        return;
    }
    
    if(myValue < 5){
        console.log(myValue + "is a small number");
        let myMessage = myValue + " is a small number"
        newNumbers.textContent= myMessage;
        newNumbers.classList.add("highlight")

        
    }else{
        console.log(myValue + "is a large number");
        let myMessage = myValue + " is a large number"
        newNumbers.textContent= myMessage;
        newNumbers.classList.add("highlight")
    }
    
    document.getElementById('my-input').value = "";

});

//code when the generate array is clicked
const myArray = [];
const myGenerator = document.getElementById('arraygen')


myGenerator.addEventListener('click', ()=>{
    for (let i = 1; i<=26; i++) {

        const myItem = Math.floor(Math.random() * 26)+ 1;
        myArray.push(myItem);
        
    }    
        
    console.log("My Array is " + myArray);
    newArray.innerHTML += myArray.join(", ") + "<br><br>";
    
});




