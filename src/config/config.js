import dotenv from 'dotenv';
dotenv.config();

export const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
export const jwtexpiration = process.env.JWT_EXPIRATION;
