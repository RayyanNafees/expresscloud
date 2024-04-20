// import createError from 'http-errors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import multer from 'multer'
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import engine from 'express-engine-jsx';
import uploadMiddleware from './middlewares/uploadMiddleware.js';

const app = express();
const upload = uploadMiddleware('uploads');

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', engine)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handler
app.use((err, req, res, next) => {
  res.locals.title= 'Error'
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err?.status || 500);
  res.render('error');
});

app.get('/upload', (req, res) => {
  res.locals.title='File Uploader'
	res.render('uploader')
})
app.post('/upload', upload.single('file'),  (req, res) => {
  // Access the uploaded file using req.file
  // Process the file data
  console.log({file: req.file})
  res.locals.title= 'File Uploader'
  res.locals.filename = req.file.filename

   if (!req.file) {
     // No file was uploaded
     return res.status(400).json({ error: 'No file uploaded' });
   }

   // File upload successful
   const fileUrl = req.file.path;

  res.render('uploader', {fileUrl, filealt: `${req.file.fieldname}-${Date.now()}`});
});

export default app;
