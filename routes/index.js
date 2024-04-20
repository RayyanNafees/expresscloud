import { Router } from 'express';

/* GET home page. */
export default Router().get('/', (req, res, next) => {
  res.locals.title = 'Express'
  res.render('index');
});
