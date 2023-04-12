require('module-alias/register');
import Database from '@/configs/database';
import { handleError } from '@/middlewares/error.middleware';
import {
  authRoute,
  departmentRoute,
  positionRoute,
  profileRoute
} from '@/routes';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import AppError from './utils/error';
import cookieParser from 'cookie-parser';

dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.database();
    this.plugins();
    this.routes();
  }

  protected routes(): void {
    this.app.use('/auth', authRoute);
    this.app.use('/profiles', profileRoute);
    this.app.use('/departments', departmentRoute);
    this.app.use('/positions', positionRoute);
    this.app.use('*', (req, res, next) => {
      const error = new AppError({ code: 404, message: 'Undefined route' });
      next(error);
    });

    this.app.use(handleError);
  }

  protected plugins(): void {
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  protected database(): void {
    const db = new Database();
    db.sequelize?.sync();
  }
}

const app = new App().app;
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
