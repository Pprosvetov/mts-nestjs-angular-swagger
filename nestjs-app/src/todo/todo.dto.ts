import { Document } from "mongoose";

export class TodoDto extends Document  {
  _id: string;
  name: string;
}
