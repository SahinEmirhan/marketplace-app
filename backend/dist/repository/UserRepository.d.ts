import type User from "../entity/User.js";
export declare class UserRepository {
    findByEmail(email: string): Promise<User | null>;
    isExist(email: string): Promise<boolean>;
    save(user: User): Promise<User>;
}
//# sourceMappingURL=UserRepository.d.ts.map