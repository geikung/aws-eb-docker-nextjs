// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { check } from 'express-validator';
import appMiddleware from '../../middlewares/app';
import authMiddleware from '../../middlewares/auth';
import validateMiddleware from '../../middlewares/validate';

const executes = {
  GET: async (req, res) => {
    res.json({ message: 'GET Hello Everyone!' });
  },
  POST: async (req, res) => {
    await authMiddleware()(req, res);
    await validateMiddleware([
      check('myVar1')
        .isBoolean()
        .withMessage('myVar1 is required'),
      check('myVar2').isBoolean().optional(),
    ])(req, res);

    const { body } = req;

    res.json({ message: 'POST Hello Everyone!' });
  },
};

async function handler(req, res) {
  await appMiddleware({
    allowMethod: ['*'],
    executes,
  })(req, res);
  return executes[req.method](req, res);
};

export default handler;
