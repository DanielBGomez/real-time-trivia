// Interfaces
import { Question } from '../schemas/Question.schema';
import { User } from '../schemas/User.schema';

// Common
import { ErrorObj } from '../common/Error';

// Data
import { Questions } from '../data/Questions';

// Types
export type Model = Array<{ [key: string]: any }>;
export type InsertValue = Question | User;

/**
 * Store
 */
export class Store {
  private _stores: { [key: string]: Array<object> } = {};
  private models = {
    user: '_Users',
    users: '_Users',
    question: '_Questions',
    questions: '_Questions'
  };

  /* eslint-disable-next-line require-jsdoc */
  constructor () {
    this._stores._Questions = Questions;
    this._stores._Users = <Array<User>>[];
  }

  /**
   * Get a model array.
   */
  getModel (model: string | Model): Model {
    if (Array.isArray(model)) return model;

    if (!this.models[model as keyof typeof this.models] || !this._stores[this.models[model as keyof typeof this.models] as keyof typeof this._stores]) {
      throw new ErrorObj({
        status: 500,
        name: 'STORE_NOT_FOUND',
        message: 'The requested model is not registered.'
      });
    }
    return this._stores[this.models[model as keyof typeof this.models]];
  }

  /**
   * Get an element from a model based on the ID.
   */
  async get(model: string | Model, id: string) {
    return this.getModel(model).find(({ _id }) => _id === id);
  }

  /**
   * Checks if a provided id exists inside a model.
   */
  async exists (model: string | Model, id: string) {
    return Boolean(await this.get(model, id));
  }
  /**
   * Generates a new element if does not exists already.
   */
  async insert (model: string, value: InsertValue) {
    const Model = this.getModel(model);
    if (await this.exists(Model, value._id)) {
      throw new ErrorObj({
        status: 409,
        name: 'DUPLICATED',
        message: 'The element already exists in the store.'
      });
    }
    Model.push(value);
    console.log(Model);
    return value;
  }
};