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
                
                
                
                console.log(`case button type = ${btnType} with a value of ${btnValue}`);
                console.log(lastType);
                break;
            
        }
});


