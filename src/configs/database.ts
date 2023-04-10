import { Sequelize } from 'sequelize-typescript';
import User from '@/models/user';
import Profile from '@/models/profile';
import Department from '@/models/department';
import Position from '@/models/position';

class Database {
  public sequelize?: Sequelize;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
  private POSTGRES_USER = process.env.POSTGRES_USER as string;
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

  constructor() {
    this.connect();
  }

  private async connect() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: 'postgres',
      models: [User, Profile, Department, Position],
      define: {
        paranoid: true,
        timestamps: true
      }
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log(
          `⚡️[server]: Database is connected at ${this.POSTGRES_HOST}:${this.POSTGRES_PORT}`
        );
      })
      .catch((error) => {
        console.log(`⚡️[server]: Error connecting to database: ${error}`);
      });
  }

  async disconnect() {
    console.log(`⚡️[server]: Disconnecting database ...`);
    this.sequelize
      ?.close()
      .then(() => {
        console.log(`⚡️[server]: Database is disconnected`);
      })
      .catch((error) => {
        console.log(`⚡️[server]: Error disconnecting database: ${error}`);
      });
  }
}

export default Database;
