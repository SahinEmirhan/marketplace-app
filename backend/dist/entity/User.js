export default class User {
    id;
    email;
    password;
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
        return this;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
        return this;
    }
}
//# sourceMappingURL=User.js.map