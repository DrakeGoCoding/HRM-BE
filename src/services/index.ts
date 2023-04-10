import { Model, ModelCtor } from 'sequelize-typescript';

export interface IBaseService<T extends Model> {
  create(payload: T): Promise<T>;
  update(id: number, payload: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
}

export abstract class BaseService<T extends Model> implements IBaseService<T> {
  abstract getModel(): ModelCtor<T>;
  abstract create(payload: T): Promise<T>;

  async update(id: number, payload: Partial<T>): Promise<T> {
    const modelName: string = this.getModel().tableName;
    try {
      const record = await this.getById(id);
      if (!record) {
        throw new Error(`${modelName} not found`);
      }

      Object.assign(record, payload);

      const updatedNote = await record.save();
      return updatedNote;
    } catch (error) {
      throw new Error(`Failed to update ${modelName}`);
    }
  }

  async delete(id: number): Promise<void> {
    const modelName: string = this.getModel().tableName;
    try {
      const record = await this.getById(id);
      if (!record) {
        throw new Error(`${modelName} not found`);
      }
      await record.destroy({});
    } catch (error) {
      throw new Error(`Failed to delete ${modelName}`);
    }
  }

  getById(id: number): Promise<T | null> {
    try {
      const record = this.getModel().findOne<T>({
        where: { id: id as any }
      });
      return record;
    } catch (error) {
      throw new Error(`Failed to get ${this.getModel().tableName}`);
    }
  }

  getAll(): Promise<T[]> {
    try {
      const records = this.getModel().findAll<T>();
      return records;
    } catch (error) {
      throw new Error(`Failed to get ${this.getModel().tableName}`);
    }
  }
}
