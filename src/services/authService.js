import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/responseError.js';
import { createTokenUser } from '../utils/createTokenUser.js';
import { createJwt } from '../utils/jwt.js';
import {
  loginValidation,
  registerValidation,
} from '../validation/authValidation.js';
import { getUserIdValidation } from '../validation/userValidation.js';
import { validate } from '../validation/validation.js';
import bcrypt from 'bcrypt';

const register = async (request) => {
  const user = validate(registerValidation, request);

  const countEmail = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countEmail === 1) {
    throw new ResponseError(400, 'Email already in use');
  }

  if (user.password !== user.confirmPassword) {
    throw new ResponseError(400, 'Password not match');
  }

  user.password = await bcrypt.hash(user.password, 10);

  delete user.confirmPassword;

  return prismaClient.user.create({
    data: user,
    select: {
      name: true,
      email: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, 'email or password not found');
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, 'email or password not found');
  }

  const token = createJwt({ payload: createTokenUser(user) });

  return { token };
};

const logout = async (token) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: token.id,
    },
  });

  if (!user) {
    throw new ResponseError(401, 'user not found');
  }

  return prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });
};

export default { register, login, logout };
