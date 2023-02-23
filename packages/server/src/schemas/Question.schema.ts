// Modules
import { Schema } from 'mongoose';

// Interfaces
import { translations } from '../common/interfaces';
export interface Answer {
  _id: string,
  text: string,
  translations: translations,
}
export interface Question {
  _id: string,
  text: string,
  translations: translations,
  answers: Array<Answer>,
  solution: string,
}

// Schema
export const QuestionSchema = new Schema({
  _id: String,
  text: String,
  translations: {
    en: String
  },
  answers: [{
    _id: String,
    text: String,
    translations: {
      en: String
    }
  }],
  solution: String,
});