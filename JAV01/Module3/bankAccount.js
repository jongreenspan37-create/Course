
export class bankAccount {
    constructor(name, email, account, pass, initialBalance) {
        this.name = name;
        this.email = email;
        this.account = account;
        this.pass = pass;
        this.balance = initialBalance;
        this.history = [];
    }

    // PASTE THE METHOD HERE
    addTransaction(type, amount) {

        const numericAmount = Number(amount)
        if (type.toLowercase()==="deposit"){
                this.balance += amount;
        }else{
             this.balance -= amount;
        }
        
    
        // Update the actual balance
        

        const entry = {
            date: new Date().toLocaleString(), // Includes time
            type: type,
            amount: numericAmount,
            currentBalance: this.balance
    };

    this.history.push(entry);
    }
}
