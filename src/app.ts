import express from 'express';
import mongoose from 'mongoose';
import cardsRouter from './routes/card';
import usersRouter from "./routes/user"
import bodyParser from 'body-parser';

const { PORT = 3000, BASE_PATH = "none" } = process.env;
const app = express();

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      _id: string;
    };
  }
}

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6671798cba506b7db0f35eb3'
  };
  next();
});
app.use('/cards', cardsRouter);
app.use('/users', usersRouter)

app.listen(PORT, () => {
});

