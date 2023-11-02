import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/responseError.js';
import {
  createUserValidation,
  updateUserValidation,
} from '../validation/userValidation.js';
import { validate } from '../validation/validation.js';
import bcrypt from 'bcrypt';

const get = async () => {
  const user = await prismaClient.user.findMany();
  return user;
};

const getDataById = async (userId) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  return user;
};

const create = async (request) => {
  const user = validate(createUserValidation, request);

  user.password = await bcrypt.hash(user.password, 10);

  const result = await prismaClient.user.create({
    data: user,
    select: {
      name: true,
      email: true,
    },
  });
  return result;
};

const update = async (userId, updataUserData) => {
  const user = validate(updateUserValidation, updataUserData);

  // const data = {};
  // if (user.name) {
  //   data.name = user.name;
  // }
  // if (user.email) {
  //   data.email = user.email;
  // }
  // if (user.password) {
  //   data.password = await bcrypt.hash(user.password, 10);
  // }

  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      name: user.name,
      email: user.email,
      password: user.password
        ? await bcrypt.hash(user.password, 10)
        : undefined,
    },
    select: {
      name: true,
      email: true,
    },
  });
};

const remove = async (userId) => {
  const user = await prismaClient.user.delete({
    where: {
      id: userId,
    },
  });

  return user;
};

export default {
  get,
  getDataById,
  create,
  update,
  remove,
};
