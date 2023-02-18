// Modules
import { v4 as uuid, validate as isUUIDValid } from 'uuid';
import { Store } from './Store';

// Common
import { ErrorObj } from '../common/Error';

// TS
import { Response } from '../common/interfaces';
import { Question } from '../schemas/Question.schema';
import { User } from '../schemas/User.schema';


export type Broadcast = (event: string, data: object) => Promise<object | void> | void;
export type Message = (to: string, response: Response) => Promise<object | void> | void;
export interface TriviaProps {
  store: Store,
  broadcast: Broadcast, 
  message: Message,
}
export type TriviaStatus = 'CREATED' | 'READY' | 'RECEIVING_ANSWERS' | 'LEADERBOARD' | 'WINNER';

/**
 * Trivia module
 */
export class Trivia {
  private _store?: Store;
  private questions?: Array<Question> = [];
  private currentQuestion ?: Question;

  private broadcast: Broadcast = (event: string, data: object) => Promise.resolve(data);
  private message: Message = (to, response: Response) => Promise.resolve(response);

  public status: TriviaStatus = 'CREATED';

  /* eslint-disable-next-line require-jsdoc */
  constructor (props: TriviaProps) {
    // Setup store
    this._store = props.store;

    return this;
  }
  /**
   * Handle the user connection
   */
  async userConnected (sender: string, data: User | string) {
    try {
      let user;

      switch (typeof data) {
        case 'string':
          user = await this.validateUserByUUID(data);
          break;
        case 'object':
          user = await this._store?.insert('user', data);
          break;
        default:
          throw new ErrorObj({
            status: 400,
            name: 'INVALID_DATA_PROVIDED',
            message: 'Invalid data provided'
          });
      }

      this.message(sender, {
        status: 200,
        name: 'Valid user',
        data: {
          user
        }
      });

    } catch (error) {
      if (error instanceof ErrorObj) this.message(sender, error);
    }
  }
  /**
   * Validate if the user exists.
   */
  async validateUserByUUID (user: string) {
    if (!isUUIDValid(user)) {
      throw new ErrorObj({
        status: 400,
        name: 'INVALID_UUID',
        message: 'UUID is not valid',
        data: {
          uuid: uuid()
        }
      });
    }

    // Get user by uuid
    const userData = await this._store?.get('user', user);
    if (!userData) {
      throw new ErrorObj({
        status: 404,
        name: 'USER_NOT_FOUND',
        message: 'User not found'
      });
    }

    return userData;
  }

}
