//GLOBAL VARIABLES
const calcBody = document.getElementById('calculator-body');
const resultViewer =document.getElementById('result-viewer');
const calcArrayView = document.getElementById('calc-array-view');
const errMsg = document.getElementById('error-message')
const calcArray=[];

let holdingNumber = "";
let lastType ="";
let runningTotal = 0;
let nextOperator ="";

//FUNCTIONS

//Visual only addition to calc
function addToResultViewer(value){
    resultViewer.append(value);
}

function removeFromResultViewer(){
    resultViewer.textContent = resultViewer.textContent.slice(0, -1)
}

//visual for developer
function showArray(){
    calcArrayView.textContent = calcArray.value;
    console.log(calcArray);
}

//error messages in viewer
function errorMessage(message){
    
    errMsg.classList.remove('hidden');
    errMsg.textContent=message;
    
    setTimeout(()=>{
        errMsg.classList.add('hidden');
    }, 1500);

}

function performCalculation(tempArray, op1, op2){

    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };

    console.log(tempArray.length);
    
    for (let i=0; i < tempArray.length; i++){
        
        const item=tempArray[i];
        console.log(item.type);
        console.log(item.value);
        if(item.type === 'operator' && (item.value === op1 || item.value === op2)){
            const leftNum = Number(tempArray[i - 1].value);
            const rightNum = Number(tempArray[i + 1].value);
            const op = item.value;

            let subResult = operations[op](leftNum, rightNum);
            console.log("this is the subResult");
            console.log(subResult);
            

            tempArray.splice(i - 1, 3, {type: 'number',value:subResult});

            i -= 2;

        }
        
        
        
        
        }
        console.log("before leaving")
        
        return tempArray;

}

//EVENT LISTNERS
calcBody.addEventListener('click',(e)=>{
    
  if(!e.target.matches('button')){
      console.log("not a button");
        return;
    } 

    const btnType = e.target.dataset.type;
    const btnValue = e.target.dataset.value;
    

        switch (btnType){
            case 'clear':
                console.log(`case button type = ${btnType} with a value of ${btnValue}`);
                resultViewer.textContent ="";
                calcArrayView.textContent = null;
                calcArray.length = 0;


                break;

            case 'plus-minus':
                console.log(`case button type = ${btnType} with a value of ${btnValue}`);
                break;

            case 'operator':
                console.log(`case button type = ${btnType} with a value of ${btnValue}`);
                
                if(calcArray.length == 0 && !holdingNumber){
                    console.log("you need a number first!");
                    break;
                }
                else if(lastType==='operator'){
                    removeFromResultViewer();
                    calcArray.pop()
                    calcArray.push({type:btnType, value:btnValue});
                    addToResultViewer(btnValue);
                    

                }
                else{
                    addToResultViewer(btnValue);
                    calcArray.push({type: 'number', value:holdingNumber});
                    calcArray.push({type:btnType, value:btnValue});
                    holdingNumber="";
                    lastType=btnType
                    console.log("Last type = " + lastType);
                    showArray();
                }
                
                break;

            case 'number':
                
                holdingNumber += btnValue;
                lastType = 'number';
                addToResultViewer(btnValue);
                console.log(`case type = ${btnType} value ${btnValue} holding value= ${holdingNumber}`);

                break;

            case 'point':
                console.log(`case button type = ${btnType} with a value of ${btnValue}`);
                addToResultViewer(btnValue);
                break;
          
            case 'percentage':
                
                break;
            
            case 'equals':
                if(lastType !=='number'){
                    console.warn('Last control needs to be a number')
                    errorMessage('Last control needs to be a number')
                    return;
                }

                calcArray.push({type: 'number', value:holdingNumber});
                holdingNumber="";

                let tempArray =[...calcArray];
                console.log("this is inside the equals case" + tempArray);

                performCalculation(tempArray,"*","/");
                console.log("after first iteration");
                console.log(tempArray);
                performCalculation(tempArray,"+","-");
                console.log("after second iteration");
                console.log(tempArray);


                
                
                
                console.log(`case button type = ${btnType} with a value of ${btnValue}`);
                console.log(lastType);
                break;
            
        }
});


