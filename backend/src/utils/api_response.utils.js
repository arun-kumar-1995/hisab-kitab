export const APIResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data }),
  });
};

export const APIError = (res, statusCode, message, errorType) => {
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      error_type: errorType,
      error_code: statusCode,
    },
  });
};
