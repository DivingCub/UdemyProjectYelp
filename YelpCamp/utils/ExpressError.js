class ExpressError extends Error {

    constructor(message,statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }

}

module.exports = ExpressError;
//定义好这里的statuscode，类似4000什么的，传递的message是什么，表达是什么