import { HTTP } from "../constants/http.constants.js";

// catch async error middleware

export const CatchAsyncError = (func) => {
  return (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
};

export const ErrorMiddleware = (err, req, res, next) => {
  let message = err.message || HTTP.MESSAGE.INTERNAL_SERVER_ERROR;
  let statusCode = err.statusCode || HTTP.STATUS.INTERNAL_SERVER_ERROR;
  let errorType = HTTP.ERROR_TYPES.SERVER_ERROR;

  if (err instanceof ReferenceError) {
    errorType = HTTP.ERROR_TYPES.REFERENCE_ERROR;
  }

  if (err.name === "TypeError") {
    errorType = HTTP.ERROR_TYPES.SYNTAX_ERROR;
  }
  if (err.name === "JsonWebTokenError") {
    errorType = HTTP.ERROR_TYPES.JWT_ERROR;
  }

  if (err.name === "TokenExpiredError") {
    errorType = HTTP.ERROR_TYPES.TOKEN_EXPIRED;
    statusCode = HTTP.STATUS.FORBIDDEN
  }

  // error response
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      error_type: errorType,
      error_code: statusCode,
    },
  });
};
