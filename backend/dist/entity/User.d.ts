export default class User {
    private id;
    private email;
    private password;
    constructor(email: string, password: string);
    getId(): string;
    setId(id: string): void;
    getEmail(): string;
    setEmail(email: string): this;
    getPassword(): string;
    setPassword(password: string): this;
}
//# sourceMappingURL=User.d.ts.map