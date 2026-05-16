export class Account{
    constructor (title,firstName,surname,email,password){
        this.title = title
        this.firstName = firstName
        this.surname = surname
        this.email = email
        this.password = password
    }

    getFullName(){

        return `${this.title} ${this.firstName} ${this.surname}`;

    }
    
}