import { ResponseStatus } from "./enum/ResponseStatus.js";
export class BaseResponse {
    static send(res, status, message, data) {
        return res.status(status).json({ message, data });
    }
}
//# sourceMappingURL=BaseResponse.js.map