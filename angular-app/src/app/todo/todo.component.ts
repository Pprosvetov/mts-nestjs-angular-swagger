import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import { TodoApiService } from '../services/todo-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoList: TodoModel[] = [];
  formTodo: FormGroup;
  formError: boolean = false;
  isLoading = true;
  isError = false;

  constructor(
    private _fb: FormBuilder,
    private _todoApiService: TodoApiService
  ) {
    this.formTodo = this._fb.group({
      name: ['',
        Validators.required,
      ],
    });

    this.getTodoList();
  }

  getTodoList() {
    this.isLoading = true;
    this.isError = false;

    this._todoApiService.getTodoList().subscribe((todoList) => {
      this.todoList = todoList;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      this.isError = true;
    })
  }

  removeTodo(id: string, index: number) {
    this._todoApiService.deleteTodo(id).subscribe(() => {
      this.todoList.splice(index, 1);
    })
  }

  submitForm() {
    this.formError = false;
    if (this.formTodo.value.name === '') {
      this.formError = true;
      return;
    }
    this._todoApiService.addTodo(this.formTodo.value).subscribe((newTodo) => {
      this.todoList.push(newTodo);
    })
    this.formTodo.patchValue({
      name: ''
    });
  }

  ngOnInit(): void {
  }

}
