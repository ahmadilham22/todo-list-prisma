import { prismaClient } from '../application/database.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';

export const authUser = async (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ errors: 'Unauthorized' });
  } else {
    token = req.header('Authorization').split('Bearer ')[1];
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await prismaClient.user.findFirst({
      where: {
        token: decoded.token,
      },
    });

    if (!user) {
      return res.status(401).json({ errors: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ errors: 'Unauthorized' });
  }
};
