require('module-alias/register');
import dotenv from 'dotenv';
import express, { Application } from 'express';
import Database from '@/configs/database';
import router from '@/routes/index';

dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  protected routes(): void {
    this.app.use(router);
  }

  protected middlewares(): void {
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
