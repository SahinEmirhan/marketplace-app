import User from "../../entity/User.js"

export class UserMapper{
    static toDomain(doc : any) : User{
        const user = new User(doc.email , doc.password);
        user.setId(doc._id);
        return user;
    }

    static toPersistance(user : User){
        return {
            email : user.getEmail(),
            password : user.getPassword(),
        }
    }
}