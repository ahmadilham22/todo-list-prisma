import userService from '../services/userService.js';

const get = async (req, res, next) => {
  try {
    const result = await userService.get();
    res.status(200).json({
      message: 'Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const userId = parseInt(req.params.id);
  try {
    const result = await userService.getDataById(userId);
    res.status(200).json({
      message: 'Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const result = await userService.create(req.body);
    res.status(201).json({
      message: 'Successfully created',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const userId = parseInt(req.params.id);
  const updateDataUser = req.body;
  try {
    const result = await userService.update(userId, updateDataUser);

    res.status(200).json({
      message: 'Successfully updated',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = parseInt(req.params.id);
  try {
    const result = await userService.remove(userId);
    res.status(200).json({
      message: 'Successfully deleted',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  get,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
