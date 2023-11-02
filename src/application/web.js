import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from '../routes/api.js';
import { errorMiddleware } from '../middleware/errorMiddleware.js';
import { publicRouter } from '../routes/public-api.js';
dotenv.config();

export const web = express();

web.use(express.json());
web.use(express.urlencoded({ extended: true }));

web.use(userRouter);
web.use(publicRouter);

web.use(errorMiddleware);
