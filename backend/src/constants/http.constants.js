const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVER_ERROR: 500,
  VALIDATION_ERROR: 422,
  AUTH_ERROR: 401,
  TOO_MANY_REQUEST: 429,
};

const HTTP_MESSAGES = {
  OK: "Success",
  CREATED: "Resource created successfully",
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Resource not found",
  CONFLICT: "Conflict occurred",
  UNPROCESSABLE_ENTITY: "Unprocessable entity",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};

const ERROR_TYPES = {
  SERVER_ERROR: "Server Error",
  VALIDATION_ERROR: "Validation Error",
  AUTH_ERROR: "Authentication Error",
  PERMISSION_DENIED: "Permission Denied",
  BAD_REQUEST: "Bad Request",
  NOT_FOUND: "Resource Not Found",
  FORBIDDEN: "Forbidden Access",
  CONFLICT: "Resource Conflict",
  TIMEOUT_ERROR: "Request Timeout",
  TOKEN_EXPIRED: "Token Expired",
  UNAUTHORIZED: "Unauthorized Access",
  DATABASE_ERROR: "Database Error",
  NETWORK_ERROR: "Network Error",
  REFERENCE_ERROR: "Reference Error",
  TYPE_ERROR: "Type Error",
  SYNTAX_ERROR: "Syntax Error",
  RANGE_ERROR: "Range Error",
  CUSTOM_ERROR: "Custom Error",
  NOT_IMPLEMENTED: "Not Implemented",
  SERVICE_UNAVAILABLE: "Service Unavailable",
  JWT_ERROR: "JWT Error",
  EMAIL_ERROR: "Email Error",
};

export const HTTP = {
  STATUS: HTTP_STATUS,
  METHOD: HTTP_METHOD,
  MESSAGE: HTTP_MESSAGES,
  ERROR_TYPES: ERROR_TYPES,
};
