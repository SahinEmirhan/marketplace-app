import type {Response} from "express"
import {ResponseStatus} from "./enum/ResponseStatus.js";

export class BaseResponse {
  static send(
    res: Response,
    status: ResponseStatus,
    message: string | null,
    data : any,
  ){
    return res.status(status).json({ message, data });
  }
}