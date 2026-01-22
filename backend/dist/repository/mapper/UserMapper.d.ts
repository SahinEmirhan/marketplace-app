import User from "../../entity/User.js";
export declare class UserMapper {
    static toDomain(doc: any): User;
    static toPersistance(user: User): {
        email: string;
        password: string;
    };
}
//# sourceMappingURL=UserMapper.d.ts.map