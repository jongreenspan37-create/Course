
//create an empty array to hold the data
const myArray = [];

const myGroup =["Romance", "Action", "Comedy", "Horror", "Sci-Fi", "Fantasy"];

//create const for fixed elements
const btnAddtl = document.getElementById("btnadd-tl");
const btnAddap = document.getElementById("btnadd-ap");
const btnRemoveFirst = document.getElementById("btnremovefirst");
const btnRemoveLast = document.getElementById("btnremovelast");
const arrayInput = document.getElementById("arrayinput");

//populate group drop down
const dropDown = document.getElementById("myselect");
myGroup.forEach((item)=>{
    let option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    dropDown.appendChild(option);
});





//add an item to the array using template literals and display it in the div
btnAddtl.addEventListener ("click", function() {
    //check if input is not null and meets validity requirements
    if (arrayInput.checkValidity() && dropDown.value !== ""){
    //if valid, add to array and display in div using template literals
    let myInput = arrayInput.value;
    let myDropdown = dropDown.value;
    myArray.push({name: myInput, genre: myDropdown});
    let myDiv = document.querySelector("#arraydisplay");
    myDiv.innerHTML += `<p><span class="font-bold">Name:</span> ${myInput} - <span class="font-bold">Genre:</span>  ${myDropdown}</p>`;
    console.log(myArray);
    arrayInput.value = "";
    dropDown.value = "";

    }
});

//add an item to the array using append and display it in the div
btnAddap.addEventListener ("click", function() {
    //check if input is not null and meets validity requirements
    if (arrayInput.checkValidity()){
    //if valid, add to array and display in div using append
    let myInput = arrayInput.value;
    myArray.push(myInput);
    let myDiv = document.querySelector("#arraydisplay");
    let newPara = document.createElement('p');
    newPara.textContent = myInput;
    myDiv.appendChild(newPara);
    console.log(myArray);
    arrayInput.value = "";
    }
});
