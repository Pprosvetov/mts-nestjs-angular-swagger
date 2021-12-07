import * as mongoose from "mongoose";

const { Schema } = mongoose;

export const TodoSchema = new Schema({
  name: String
});
