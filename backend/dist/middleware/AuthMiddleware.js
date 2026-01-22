import jwt, {} from "jsonwebtoken";
import { ResponseStatus } from "../dto/response/enum/ResponseStatus.js";
import { BaseResponse } from "../dto/response/BaseResponse.js";
export function authMiddleware(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        return BaseResponse.send(res, ResponseStatus.UNAUTHORIZED, "Unauthorized", null);
    }
    try {
        const ACCESS_SECRET = process.env.ACCESS_SECRET;
        const payload = jwt.verify(token, ACCESS_SECRET);
        res.locals.userId = payload.userId;
        next();
    }
    catch (err) {
        return BaseResponse.send(res, ResponseStatus.UNAUTHORIZED, "Token expired or invalid", null);
    }
}
//# sourceMappingURL=AuthMiddleware.js.map