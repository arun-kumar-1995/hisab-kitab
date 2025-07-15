import nodemailer from "nodemailer";
import { SECRET_KEY } from "../constants/secret_keys.constants.js";
import { EmailError } from "../utils/custom_errors.utils.js";

const transport = nodemailer.createTransport({
  host: SECRET_KEY.EMAIL_SERVICE,
  port: SECRET_KEY.EMAIL_SERVICE_PORT,
  secure: true,
  auth: {
    user: SECRET_KEY.EMAIL_AUTH_USER,
    pass: SECRET_KEY.EMAIL_AUTH_PASSWORD,
  },
});

export const SendEmail = async (userEmail, otp) => {
  console.log(userEmail, otp);
  try {
    await transport.sendMail({
      from: SECRET_KEY.EMAIL_AUTH_USER,
      to: userEmail,
      subject: `Your OTP is ${otp} - Hisab Kitab`,
      text: `Hello,\n
      Your OTP code for verifying your email address is: 482913. This OTP is valid for 5 minute.`,
    });
  } catch (err) {
    throw new EmailError(err.message);
  }
};
