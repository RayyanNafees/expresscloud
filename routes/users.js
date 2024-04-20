import { Router } from 'express';

/* GET users listing. */
export default Router().get('/', (req, res, next) => {
  res.locals.title = 'Users'
  res.send('respond with a resource');
});
