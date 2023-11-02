import { ResponseError } from '../error/responseError.js';
import ValidationError from 'joi';

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        errors: err.message,
      })
      .end();
  } else if (err.details && Array.isArray(err.details)) {
    // Ini adalah objek kesalahan validasi dari Joi
    res
      .status(400)
      .json({
        errors: err.details.map((error) => error.message).join(', '),
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        errors: err.message,
      })
      .end();
  }
};

export { errorMiddleware };
