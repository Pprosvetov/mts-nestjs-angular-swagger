import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';
import { CreateTodoDto } from './create-todo.dto';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private _todoService: TodoService) {}

  @Post('/add')
  async createTodo(
    @Res() res,
    @Body() CreateTodo: CreateTodoDto,
  ): Promise<TodoDto> {
    const todo: TodoDto = await this._todoService.createTodo(CreateTodo);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: 'Successful!',
      data: todo,
    });
  }

  @Get('/all')
  async getAllTodos(@Res() res): Promise<TodoDto[]> {
    const todos = await this._todoService.getAllTodo();
    return res.status(HttpStatus.OK).json(todos);
  }

  @Delete('/delete/:toDoId')
  async deleteTodo(@Res() res, @Param('toDoId') _id: string) {
    const todo = await this._todoService.deleteTodo(_id);
    if (!todo)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: 'Not found!' });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'Successful!',
    });
  }
}
