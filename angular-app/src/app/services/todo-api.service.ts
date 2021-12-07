import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { TodoModel } from '../models/todo.model';
import { TodoCreateModel } from '../models/todoCreate.model';
import { catchError, map } from 'rxjs/operators';

interface HttpResponseData extends HttpResponse<TodoModel> {
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  addTodoUrl: string = 'http://localhost:3000/todo/add';
  todoListUrl: string = 'http://localhost:3000/todo/all';
  deleteTodoUrl: string = 'http://localhost:3000/todo/delete/';

  constructor(private http: HttpClient) { }

  private _handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getTodoList(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.todoListUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => this._handleError(error))
      );
  }

  addTodo(todo: TodoCreateModel): Observable<TodoModel> {
    return this.http.post<HttpResponseData>(this.addTodoUrl, todo)
      .pipe(
        map((result) => result.data),
        catchError((error: HttpErrorResponse) => this._handleError(error))
      );
  }

  deleteTodo(todoId: string): Observable<TodoModel> {
    return this.http.delete<HttpResponseData>(this.deleteTodoUrl + todoId)
      .pipe(
        map((result) => result.data),
        catchError((error: HttpErrorResponse) => this._handleError(error))
      );
  }
}
