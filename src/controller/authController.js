import { jwtSecret } from '../config/config.js';
import authService from '../services/authService.js';
import jwt from 'jsonwebtoken';

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      message: 'Data successfully registered',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      message: 'Successfully logged in',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  console.log('====================================');
  console.log(token);
  console.log('====================================');

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    await authService.logout(decodedToken);
    res.status(200).json({
      message: 'Logout berhasil',
    });
  } catch (error) {
    next(error);
  }
};

export default { register, login, logout };
