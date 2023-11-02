import jwt from 'jsonwebtoken';
import { jwtSecret, jwtexpiration } from '../config/config.js';

const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtexpiration,
  });

  return token;
};

export { createJwt };
