export default function appMiddleware({ allowMethod, executes, middleware }) {
  // eslint-disable-next-line consistent-return
  return (req, res) => new Promise((resolve, reject) => {
    if (
      (
        typeof allowMethod === 'string'
        && allowMethod !== '*'
      )
      || (
        Array.isArray(allowMethod)
        && allowMethod.indexOf('*') === -1
        && allowMethod.indexOf(req.method) === -1
      )
      || !allowMethod
      || !executes
      || !executes[req.method]
    ) {
      return res.status(500).send('Not allow method');
    }
    if (middleware) {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    }
    resolve();
  });
}
