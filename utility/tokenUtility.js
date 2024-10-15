import jwt from "jsonwebtoken";
import { JWT_EXPIRE_TIME, JWT_KEY } from "./../config/config.js";

export const generateToken = (email, user_id) => {
  const KEY = JWT_KEY;
  const EXPIRE = { expiresIn: JWT_EXPIRE_TIME };
  const PAYLOAD = { email: email, user_id: user_id };
  return jwt.sign(PAYLOAD, KEY, EXPIRE);
};

export const verifyToken = (token) => {
  try {
    const KEY = JWT_KEY;
    return jwt.verify(token, KEY);
  } catch (e) {
    return null;
  }
};
