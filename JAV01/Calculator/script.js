//GLOBAL VARIABLES
const calcBody = document.getElementById('calculator-body');
const inputViewer = document.getElementById('input-viewer');
const resultViewer =document.getElementById('result-viewer');
const errMsg = document.getElementById('error-message')
const calcArray=[];
const arrayDebugViewer = document.getElementById('array-debug-viewer');


let holdingNumber = "";
let previousNumber ="";
let lastType ="";
let resultStatus = false;



//FUNCTIONS

//Visual only addition to calc
function addToInputViewer(value){
    inputViewer.textContent += value;
}

//remove last digit
function removeLastItem(){
    inputViewer.textContent = inputViewer.textContent.slice(0, -1);
    calcArray.pop();
    inputViewer.textContent = calcArray.map(item=> item.value).join("")
    console.log("holding number")
    console.log(holdingNumber);
}

//error messages in viewer
function errorMessage(message){
    
    errMsg.classList.remove('hidden');
    errMsg.textContent = message;
    
    
    setTimeout(()=>{
        errMsg.classList.add('hidden');
        errMsg.textContent = "";
    }, 1000);

    

}

function performCalculation(tempArray, op1, op2){

    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };
 
    for (let i = 0; i < tempArray.length; i++){
        
        const item=tempArray[i];
                
        if(item.type === 'operator' && (item.value === op1 || item.value === op2)){
            const leftNum = Number(tempArray[i - 1].value);
            const rightNum = Number(tempArray[i + 1].value);
            const op = item.value;

            let subResult = operations[op](leftNum, rightNum);
                    
            tempArray.splice(i - 1, 3, {type: 'number',value:subResult});

            i -= 2;
        }
    }
                
        return tempArray;

}

//EVENT LISTNERS
calcBody.addEventListener('click',(e)=>{
    
    if(!e.target.matches('button')){
      
        return;
    } 

    if (resultStatus){

        inputViewer.textContent = "";
        calcArray.length = 0
        resultStatus = false;

    }

    const btnType = e.target.dataset.type;
    const btnValue = e.target.dataset.value;
    

        switch (btnType){
            case 'memory-clear':
              
                inputViewer.textContent ="";
                calcArray.length = 0;
                holdingNumber="";
                lastType="";
                break;

            case 'clear':
                if(lastType === 'number'){
                    holdingNumber = holdingNumber.slice(0, -1);
                    inputViewer.textContent = inputViewer.textContent.slice(0, -1);
                    console.log('route1')
                    console.log(holdingNumber)
                
                }else if (lastType === 'operator'){
                    console.log('route2')
                    console.log(holdingNumber)
                    removeLastItem()
                    lastType= 'number'
                    
                }
                
                break;

            case 'operator':
                                
                if(calcArray.length == 0 && !holdingNumber){
                    
                    errorMessage("you need a number first!");
                    return;
                }
                else if(lastType === 'operator'){
                    
                    errorMessage("Use 'C' if you want to change the sign or add a number");
                    return;
                    
                    
                    removeLastItem();
                    calcArray.push({type:btnType, value:btnValue});
                    addToInputViewer(btnValue);
                    lastType=btnType;
    
                }
                else{
                    
                    addToInputViewer(btnValue);
                    calcArray.push({type: 'number', value:holdingNumber});
                    calcArray.push({type:btnType, value:btnValue});
                    previousNumber = holdingNumber
                    holdingNumber="";
                    lastType=btnType;
                                    
                }
                
                break;

            case 'number':
                
                holdingNumber += btnValue;
                lastType = 'number';
                addToInputViewer(btnValue);
                console.log(holdingNumber)
                break;

            case 'point':
                
                addToInputViewer(btnValue);
                break;
          
            case 'percentage':
                
                break;
            
            case 'equals':
             
            
            if(lastType !=='number'){
                    
                    errorMessage('Last control needs to be a number')
                    
                    return;
                }

                calcArray.push({type: 'number', value:holdingNumber});
                holdingNumber="";
                arrayDebugViewer.textContent = JSON.stringify(calcArray);
                let tempArray =[...calcArray];
                
                performCalculation(tempArray,"*","/");
                performCalculation(tempArray,"+","-");
                
                inputViewer.textContent = tempArray[0].value;
                
                resultStatus = true;

                break;
            
        }
        arrayDebugViewer.textContent = JSON.stringify(calcArray);
});


