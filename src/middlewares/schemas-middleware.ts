import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import httpStatus from 'http-status';

export default function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (!error) {
      next();
    } else {
      const messages = error.details.map((error) => error.message).join('\n');
      res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .send(`Há campos preenchidos de forma errada, revise-os.\n\n${messages}`);
    }
  };
}
