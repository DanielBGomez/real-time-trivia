// Modules
import { Store } from './Store';

// TS
interface TriviaProps {
  store?: object
}

/**
 * Trivia module
 */
class Trivia {
  private _store?: object;

  /* eslint-disable-next-line require-jsdoc */
  constructor (props: TriviaProps) {
    this._store = Store();

    console.log(props);

    return this;
  }

}

/**
 * Trivia module
 */
const TriviaFn = (props: TriviaProps) => new Trivia(props);

export {
  TriviaFn as Trivia,
  Trivia as Class,
};
