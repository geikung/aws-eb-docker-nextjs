function authMiddleware() {
  // eslint-disable-next-line consistent-return
  return async (req, res, next) => {
    if (
      req.headers['x-api-key']
      && req.headers['x-api-key'] === 'my_key'
    ) {
      return next();
    }

    return res.status(401).send('Unauthorize');
  };
}

export default function appMiddleware() {
  // eslint-disable-next-line consistent-return
  return (req, res) => new Promise((resolve, reject) => {
    const func = authMiddleware();
    func(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
