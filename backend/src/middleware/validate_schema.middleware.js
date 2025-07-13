import { HTTP } from "../constants/http.constants.js";

export const ValidateSchema = (schema) => {
  return (req, res, next) => {
    // get the data
    let data = { ...req.body, ...req.params, ...req.query };

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        error: {
          message: error.details
            .map((err) => err.message.replace(/\"/g, ""))
            .join(", "),
          error_code: HTTP.STATUS.BAD_REQUEST,
          error_type: HTTP.ERROR_TYPES.VALIDATION_ERROR,
        },
      });
    }

    next();
  };
};
