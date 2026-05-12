
export class BankAccount {
    constructor(name, email, account, pass, initialBalance) {
        this.name = name;
        this.email = email;
        this.account = account;
        this.pass = pass;
        this.balance = initialBalance;
        this.history = [];
    }

    //transaction script
    addTransaction(amount,type) {

        const numericAmount = Number(amount)
        if (type.toLowerCase()==="deposit"){
                this.balance += numericAmount;
        }else{
             this.balance -= numericAmount;
        }
        
        if (this.balance < 0){
            return {success:false, message: "Insufficient funds for this withdrawal."}
        }
        
        // Update the actual balance
        const entry = {
            date: new Date().toLocaleString(), // Includes time
            type: type,
            amount: numericAmount,
            currentBalance: this.balance
    };

        this.history.push(entry);
        return{success: true, entry: entry};
    }
}
