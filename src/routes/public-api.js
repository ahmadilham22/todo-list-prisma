import expres from 'express';
import authController from '../controller/authController.js';

const publicRouter = new expres.Router();

publicRouter.post('/api/users-auth/register', authController.register);
publicRouter.post('/api/users-auth/login', authController.login);

export { publicRouter };
