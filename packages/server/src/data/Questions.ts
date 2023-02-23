// Modules
import { v4 as uuid } from 'uuid';

// Interface
import { Question } from '../schemas/Question.schema';

// Configs
const solutions = [
  uuid(),
  uuid(),
  uuid(),
  uuid(),
  uuid(),
];

// Data
export const Questions: Array<Question> = [
  {
    _id: uuid(),
    text: 'Pregunta #1',
    translations: {
      en: 'Question #1',
    },
    answers: [
      {
        _id: uuid(),
        text: 'Respuesta #1',
        translations: {
          en: 'Answer #1'
        },
      },
      {
        _id: solutions[0],
        text: 'Respuesta #2',
        translations: {
          en: 'Answer #1'
        },
      },
      {
        _id: uuid(),
        text: 'Respuesta #3',
        translations: {
          en: 'Answer #1'
        },
      },
    ],
    solution: solutions[0],
  },
  {
    _id: uuid(),
    text: 'Pregunta #2',
    translations: {
      en: 'Question #2',
    },
    answers: [
      {
        _id: uuid(),
        text: 'Respuesta #1',
        translations: {
          en: 'Answer #1'
        },
      },
      {
        _id: solutions[1],
        text: 'Respuesta #2',
        translations: {
          en: 'Answer #1'
        },
      },
      {
        _id: uuid(),
        text: 'Respuesta #3',
        translations: {
          en: 'Answer #1'
        },
      },
    ],
    solution: solutions[1],
  },
  {
    _id: uuid(),
    text: 'Pregunta #3',
    translations: {
      en: 'Question #3',
    },
    answers: [
      {
        _id: uuid(),
        text: 'Respuesta #1',
        translations: {
          en: 'Answer #1'
        },
      },
      {
        _id: solutions[2],
        text: 'Respuesta #2',
        translations: {
          en: 'Answer #1'
        },
      },
      {
        _id: uuid(),
        text: 'Respuesta #3',
        translations: {
          en: 'Answer #1'
        },
      },
    ],
    solution: solutions[2],
  },
  {
    _id: uuid(),
    text: 'Pregunta #4',
    translations: {
      en: 'Question #4',
    },
    answers: [
      {
        _id: uuid(),
        text: 'Respuesta #1',
        translations: {
          en: 'Answer #1'
        },
      },
      {
        _id: solutions[3],
        text: 'Respuesta #2',
        translations: {
          en: 'Answer #1'
        },
      },
      {
        _id: uuid(),
        text: 'Respuesta #3',
        translations: {
          en: 'Answer #1'
        },
      },
    ],
    solution: solutions[3],
  },
  {
    _id: uuid(),
    text: 'Pregunta #5',
    translations: {
      en: 'Question #5',
    },
    answers: [
      {
        _id: uuid(),
        text: 'Respuesta #1',
        translations: {
          en: 'Answer #1'
        },
      },
      {
        _id: solutions[4],
        text: 'Respuesta #2',
        translations: {
          en: 'Answer #1'
        },
      },
      {
        _id: uuid(),
        text: 'Respuesta #3',
        translations: {
          en: 'Answer #1'
        },
      },
    ],
    solution: solutions[4],
  },
];
