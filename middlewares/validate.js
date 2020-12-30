import { validationResult } from 'express-validator';

function validateMiddleware(validations) {
  // eslint-disable-next-line consistent-return
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(422).json({ errors: errors.array() });
  };
}

export default function appMiddleware(validations) {
  // eslint-disable-next-line consistent-return
  return (req, res) => new Promise((resolve, reject) => {
    const validateBody = validateMiddleware(validations, validationResult);
    validateBody(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
