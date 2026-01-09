
export default class User{
    private id! : string;
    private email : string;
    private password : string;

    constructor(email : string , password : string){
        this.email = email;
        this.password = password;
    }

    getId(){
        return this.id;
    }

    setId(id : string){
        this.id = id;
    }

    getEmail(){
        return this.email;
    }

    setEmail(email : string){
        this.email = email;
        return this;
    }

    getPassword(){
        return this.password;
    }

    setPassword(password : string){
        this.password = password;
        return this;
    }
}