import { UserRepository } from "../repository/UserRepository.js";
import User from "../entity/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class AuthService {
    userRepository = new UserRepository();
    async register(authReq) {
        const isUserExist = await this.userRepository.isExist(authReq.email);
        if (isUserExist) {
            throw new Error("User is Exist");
        }
        const encodedPassword = await bcrypt.hash(process.env.BCRYPT_SECRET + authReq.password, 12);
        const user = new User(authReq.email, encodedPassword);
        this.userRepository.save(user);
        return;
    }
    async login(authReq) {
        const user = await this.userRepository.findByEmail(authReq.email);
        if (!user) {
            throw new Error("wrong email");
        }
        const isValidPassword = await bcrypt.compare(process.env.BCRYPT_SECRET + authReq.password, user?.getPassword());
        if (!isValidPassword) {
            throw new Error("wrong password");
        }
        const ACCESS_SECRET = process.env.ACCESS_SECRET;
        const accessToken = jwt.sign({ userId: user.getId() }, ACCESS_SECRET, { expiresIn: "1h" });
        return accessToken;
    }
}
//# sourceMappingURL=AuthService.js.map