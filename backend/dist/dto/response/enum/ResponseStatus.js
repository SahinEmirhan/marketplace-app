export var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["OK"] = 200] = "OK";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(ResponseStatus || (ResponseStatus = {}));
//# sourceMappingURL=ResponseStatus.js.map