import { Router } from "express";
import { ValidateSchema } from "../middleware/validate_schema.middleware.js";
import { AUTH_VALIDATION } from "../validation/auth.validation.js";
import {
  signup,
  login,
  verifyEmail,
  verifyPhone,
  sendOtp,
  logout,
} from "../controllers/auth.controller.js";
const userRoutes = Router();

userRoutes
  .route("/signup")
  .post(ValidateSchema(AUTH_VALIDATION.SIGNUP), signup);

userRoutes.route("/login").post(ValidateSchema(AUTH_VALIDATION.LOGIN), login);

userRoutes
  .route("/send-otp")
  .post(ValidateSchema(AUTH_VALIDATION.EMAIL), sendOtp);

userRoutes
  .route("/verify-email")
  .post(ValidateSchema(AUTH_VALIDATION.VERIFY_EMAIL), verifyEmail);

userRoutes
  .route("/verify-phone")
  .post(ValidateSchema(AUTH_VALIDATION.VERIFY_PHONE), verifyPhone);

userRoutes.route("/logout").post(ValidateSchema(AUTH_VALIDATION.LOGOUT), logout);

export default userRoutes;
