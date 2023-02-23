// Modules
import { Schema } from 'mongoose';

// Interfaces
export interface User {
  _id: string,
  name: string,
  image?: string,
  score?: number,
};

// Schema
export const UserSchema = new Schema({
  _id: String,
  name: String,
  image: String,
  score: Number
});