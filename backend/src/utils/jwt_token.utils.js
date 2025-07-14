import Jwt from "jsonwebtoken";
const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const GenerateToken = async (payload) => {
  return await Jwt.sign(payload, TOKEN_SECRET, { expiresIn: "7d" });
};
