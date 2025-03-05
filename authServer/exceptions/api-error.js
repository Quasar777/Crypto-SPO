module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, erorrs = []) {
        super(message);
        this.status = status;
        this.errors = this.errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, errors=[]) {
        return new ApiError(400, message, errors)
    }
}