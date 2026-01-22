import User from "../../entity/User.js";
export class UserMapper {
    static toDomain(doc) {
        const user = new User(doc.email, doc.password);
        user.setId(doc._id);
        return user;
    }
    static toPersistance(user) {
        return {
            email: user.getEmail(),
            password: user.getPassword(),
        };
    }
}
//# sourceMappingURL=UserMapper.js.map