// Interfaces
import { Question } from '../schemas/Question.schema';
import { User } from '../schemas/User.schema';

// Data
import { Questions } from '../data/Questions';

/**
 * Store
 */
class Store {
  private _Questions: Array<Question> = [];
  private _Users: Array<User> = [];

  /* eslint-disable-next-line require-jsdoc */
  constructor () {
    this._Questions = Questions;
  }

  /**
   * 
   */
  get(model: string, index: string) {
    
  }

  /**
   * 
   */
  insert (model: string, value: object) {

  }
};

/**
 * Store
 */
const StoreFn = () => new Store();

export {
  StoreFn as Store,
  Store as Class,
};
