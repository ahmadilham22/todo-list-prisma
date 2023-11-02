import expres from 'express';
import userController from '../controller/userController.js';
import { authUser } from '../middleware/authMiddleware.js';
import authController from '../controller/authController.js';

const userRouter = new expres.Router();

userRouter.get('/api/users', authUser, userController.get);
userRouter.get('/api/users/:id', authUser, userController.getUserById);
userRouter.post('/api/users', authUser, userController.createUser);
userRouter.patch('/api/users/:id', authUser, userController.updateUser);
userRouter.delete('/api/users/:id', authUser, userController.deleteUser);
userRouter.post('/api/users-auth/logout', authUser, authController.logout);

export { userRouter };
