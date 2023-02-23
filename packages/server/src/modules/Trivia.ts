// Modules
import { v4 as uuid, validate as isUUIDValid } from 'uuid';
import { Store } from './Store';

// Common
import { ErrorObj } from '../common/Error';

// TS
import { Response } from '../common/interfaces';
import { Question } from '../schemas/Question.schema';


export type Broadcast = (event: string, data: object) => Promise<object | void> | void;
export type Message = (to: string, event: string, response: Response) => Promise<object | void> | void;
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
  private message: Message = (to, event, response: Response) => Promise.resolve(response);

  public status: TriviaStatus = 'CREATED';

  /* eslint-disable-next-line require-jsdoc */
  constructor (props: TriviaProps) {
    // Setup store
    this._store = props.store;
    this.broadcast = props.broadcast;
    this.message = props.message;

    return this;
  }
  /**
   * Handle the user connection
   */
  async userConnected (_uuid: string) {
    try {
      const user = await this.validateUserByUUID(_uuid);

      this.message(_uuid, 'auth', {
        status: 200,
        name: 'Authenticated',
        data: {
          user
        }
      });

    } catch (error) {
      if (error instanceof ErrorObj) return this.message(_uuid, 'auth', error);
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
