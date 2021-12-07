import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TodoDto } from './todo.dto';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<TodoDto>,
  ) {}
  async getAllTodo(): Promise<TodoDto[]> {
    const todos = await this.todoModel.find().exec();
    return todos;
  }
  async createTodo(createTodo: CreateTodoDto): Promise<TodoDto> {
    const newTodo = new this.todoModel(createTodo);
    return newTodo.save();
  }
  async deleteTodo(_id: string): Promise<any> {
    const todo = await this.todoModel.findByIdAndRemove(_id);
    return todo;
  }
}
