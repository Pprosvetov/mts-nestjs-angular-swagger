export * from './default.service';
import { DefaultService } from './default.service';
export * from './todo.service';
import { TodoService } from './todo.service';
export const APIS = [DefaultService, TodoService];
