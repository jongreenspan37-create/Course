
export class BankAccount {
    constructor(name, email, account, pass, initialBalance) {
        this.name = name;
        this.email = email;
        this.account = account;
        this.pass = pass;
        this.balanceInPence = Math.round(Number(initialBalance) * 100);
        this.history = [];
    }

    //Clean pounds and pence figure
    get balance(){
        return this.balanceInPence /100;
    }

    //transaction script
    addTransaction(amount,action ) {

        const numericAmount = Number(amount)
        

        if (action.toLowerCase() === "withdraw" && numericAmount > this.balance){
            return {success:false, message: "Insufficient funds for this withdrawal."}
        }
        
        if (action.toLowerCase()==="deposit"){
                this.balance += numericAmount;
        }else{
                this.balance -= numericAmount;
        }
        
        
        
        // Update the actual balance
        const entry = {
            date: new Date().toLocaleString(), // Includes time
            type: action,
            amount: numericAmount,
            currentBalance: this.balance
    };

        this.history.push(entry);
        return{success: true, entry: entry};
    }
}
