case 'equals':
    if (lastType !== 'number') {
        console.warn('Last entry needs to be a number');
        return;
    }

    // 1. Push the final number being typed to the array before solving
    if (holdingNumber !== "") {
        calcArray.push({ type: 'number', value: holdingNumber });
        holdingNumber = "";
    }

    // 2. Create a temporary array copy so you don't destroy your main array structure
    let tempArray = [...calcArray];

    // ==========================================
    // PASS 1: Strictly handle Multiplication (*) and Division (/)
    // ==========================================
    for (let i = 0; i < tempArray.length; i++) {
        const item = tempArray[i];

        if (item.type === 'operator' && (item.value === '*' || item.value === '/')) {
            // Extract the numbers sitting directly to the left and right of the operator
            const leftNum = Number(tempArray[i - 1].value);
            const rightNum = Number(tempArray[i + 1].value);
            const op = item.value;
            
            // Calculate this specific chunk
            let subResult = op === '*' ? leftNum * rightNum : leftNum / rightNum;

            // .splice(index, deleteCount, itemsToInsert)
            // This removes the 3 processed items (left, op, right) and inserts 1 result object
            tempArray.splice(i - 1, 3, { type: 'number', value: String(subResult) });
            
            // CRITICAL: Step the index counter back by 2 because the array just shrank
            i -= 2; 
        }
    }

    // ==========================================
    // PASS 2: Strictly handle Addition (+) and Subtraction (-)
    // ==========================================
    for (let i = 0; i < tempArray.length; i++) {
        const item = tempArray[i];

        if (item.type === 'operator' && (item.value === '+' || item.value === '-')) {
            const leftNum = Number(tempArray[i - 1].value);
            const rightNum = Number(tempArray[i + 1].value);
            const op = item.value;
            
            let subResult = op === '+' ? leftNum + rightNum : leftNum - rightNum;

            tempArray.splice(i - 1, 3, { type: 'number', value: String(subResult) });
            i -= 2; // Step back to adapt to the smaller array size
        }
    }

    // 3. EXTRACT THE FINAL ANSWER
    // After both loops finish, tempArray will be reduced to exactly 1 object containing the answer
    const finalAnswer = tempArray[0].value;
    
    // Update your DOM display and internal states
    addToResultViewer(finalAnswer); 
    holdingNumber = finalAnswer; // Keeps the answer active so the user can keep typing from it
    calcArray.length = 0;        // Wipes the main tracking array clean for the next sum
    lastType = 'number';
    break;
