
//create an empty array to hold the data
const myArray = [];

const myGroup =["Romance", "Action", "Comedy", "Horror", "Sci-Fi", "Fantasy"];
const myBooks =[
    
                {Name:"lord of The Rings", Genre: "Fantasy"}, 
                {Name: "1984", Genre: "Sci-Fi"},
                {Name: "second foundation", Genre: "Sci-Fi"}, 
                {Name:"Brideshead Revisited", Genre: "Romance"}
                ];

//create const for fixed elements
const btnAddtl = document.getElementById("btn-add-tl");
const btnAddap = document.getElementById("btn-add-ap");
const btnAddList = document.getElementById("btn-add-list")
const btnRemoveFirst = document.getElementById("btn-remove-first");
const btnRemoveLast = document.getElementById("btn-remove-last");
const arrayInput = document.getElementById("array-input");
const myDiv = document.querySelector('#array-display');
const tableBody = document.querySelector('.array-table tbody')



//populate group drop down
const dropDown = document.getElementById("my-select");
myGroup.forEach((item)=>{
    let option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    dropDown.appendChild(option);
});

//Function to add items to the table
function tableAdd (text,newRow){
        
    const newCell = newRow.insertCell()
    newCell.textContent = text; 
}

//function to append text list showing array and then add to table 
//calls tableAdd above as well
function appendBook(myInput,myDropdown){    
    const newName = document.createElement('div');
    const newGenre = document.createElement('div');

    
    const nameLabel = document.createElement('span');
    nameLabel.classList = "font-bold"; 
    nameLabel.textContent = "Name: ";

    const genreLabel = document.createElement('span');
    genreLabel.classList = "font-bold";
    genreLabel.textContent = "Genre: ";

    newName.append(nameLabel, `${myInput}`);
    newGenre.append(genreLabel, myDropdown);
    
    //Alternative
    //newPara.appendChild(nameLabel)
    //newPara.append(" " + `${myInput}` + " ");
    //newPara.appendChild(genreLabel);
    //newPara.append(myDropdown);
   
    
    myDiv.append(newName);
    myDiv.append(newGenre);
    
    const newRow = tableBody.insertRow();
    

    tableAdd(myInput,newRow);
    tableAdd(myDropdown,newRow);
}

//Add the intial list
btnAddList.addEventListener('click',()=>{
    myBooks.forEach(({Name, Genre})=>{
        myArray.push({name: Name, genre: Genre});
        appendBook(Name,Genre);
    });
});


//add an item to the array using template literals and display it in the div
btnAddtl.addEventListener ("click", function() {
    //check if input is not null and meets validity requirements
    if (arrayInput.checkValidity() && dropDown.value !== ""){
    //if valid, add to array and display in div using template literals
    const myInput = arrayInput.value;
    const myDropdown = dropDown.value;

    myArray.push({name: myInput, genre: myDropdown});
    
    
    myDiv.innerHTML += `
    
            <div class = "flex grid-cols gap-2">
                <div><span class="font-bold">Name:</span> ${myInput} </div>
                <div><span class="font-bold">Genre:</span>  ${myDropdown} </div>
            </div>`;
    
    //add data to table
    const newRow = tableBody.insertRow();
    
    tableAdd(myInput,newRow);
    tableAdd(myDropdown,newRow);

    arrayInput.value = "";
    dropDown.value = "";

    }
});

//add an item to the array using append and display it in the div
btnAddap.addEventListener ("click", ()=> {
    
    if (arrayInput.checkValidity() && dropDown.value !== ""){ //check if input is not null and meets validity requirements
    
    //if valid, add to array and display in div using append
    const myInput = arrayInput.value;
    const myDropdown = dropDown.value;
    console.log(myInput);
    console.log(myDropdown);
    myArray.push({name: myInput, genre: myDropdown});
    console.log(myArray);
    appendBook(myInput,myDropdown);
    

    
    
    arrayInput.value = "";
    dropDown.value = "";
    }
});
