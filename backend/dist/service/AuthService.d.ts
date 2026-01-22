import type { AuthRequest } from "../dto/request/AuthRequest.js";
export declare class AuthService {
    private readonly userRepository;
    register(authReq: AuthRequest): Promise<void>;
    login(authReq: AuthRequest): Promise<string>;
}
//# sourceMappingURL=AuthService.d.ts.map