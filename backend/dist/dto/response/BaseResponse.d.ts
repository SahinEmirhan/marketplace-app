import type { Response } from "express";
import { ResponseStatus } from "./enum/ResponseStatus.js";
export declare class BaseResponse {
    static send(res: Response, status: ResponseStatus, message: string | null, data: any): Response<any, Record<string, any>>;
}
//# sourceMappingURL=BaseResponse.d.ts.map