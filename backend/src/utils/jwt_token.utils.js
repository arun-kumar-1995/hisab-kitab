import Jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants/secret_keys.constants.js";

export const generateAccessToken = async (payload) => {
  return Jwt.sign(payload, SECRET_KEY.ACCESS_SECRET_KEY, {
    expiresIn: SECRET_KEY.ACCESS_KEY_EXPIRE,
  });
};

export const generateRefreshToken = async (payload) => {
  return Jwt.sign(payload, SECRET_KEY.REFRESH_SECRET_KEY, {
    expiresIn: SECRET_KEY.REFRESH_KEY_EXPIRE,
  });
};

export const validateAccessToken = async (token) => {
  return Jwt.verify(token, SECRET_KEY.ACCESS_KEY_EXPIRE);
};

export const validateRefreshToken = async (token) => {
  return Jwt.verify(token, SECRET_KEY.REFRESH_SECRET_KEY);
};
