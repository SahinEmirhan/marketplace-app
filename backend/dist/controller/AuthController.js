import { AuthService } from "../service/AuthService.js";
import { AuthRequestSchema } from "../dto/request/AuthRequest.js";
import { BaseResponse } from "../dto/response/BaseResponse.js";
import { ResponseStatus } from "../dto/response/enum/ResponseStatus.js";
const service = new AuthService();
export async function login(req, res) {
    const result = AuthRequestSchema.safeParse(req.body);
    if (!result.success) {
        let error = JSON.parse(result.error.message);
        return BaseResponse.send(res, ResponseStatus.BAD_REQUEST, error[0].message, null);
    }
    const accessToken = await service.login(result.data);
    res.cookie('token', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    return BaseResponse.send(res, ResponseStatus.OK, "Successfully Logined", null);
}
export async function register(req, res) {
    const result = AuthRequestSchema.safeParse(req.body);
    if (!result.success) {
        let error = JSON.parse(result.error.message);
        return BaseResponse.send(res, ResponseStatus.BAD_REQUEST, error[0].message, null);
    }
    await service.register(result.data);
    return BaseResponse.send(res, ResponseStatus.OK, "User Registered", null);
}
export async function logout() {
    console.log("Logging out user");
}
//# sourceMappingURL=AuthController.js.map