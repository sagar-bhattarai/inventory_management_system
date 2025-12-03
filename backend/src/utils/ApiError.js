// https://nodejs.org/api/errors.html

class ApiError extends Error{
    constructor(statusCode, message="something went wrong", errors=[], stack=""){
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.error = errors;

        if(stack ){

        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError;