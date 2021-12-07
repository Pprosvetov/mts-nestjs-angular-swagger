import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoDto, TodoService } from '../api';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoList: TodoDto[] = [];
  formTodo: FormGroup;
  formError: boolean = false;
  isLoading = true;
  isError = false;

  constructor(
    private _fb: FormBuilder,
    private _todoService: TodoService,
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

    this._todoService.todoControllerGetAllTodos().subscribe((todoList) => {
      this.todoList = todoList;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.isError = true;
    })
  }

  removeTodo(id: string, index: number) {
    this._todoService.todoControllerDeleteTodo(id).subscribe(() => {
      this.todoList.splice(index, 1);
    });
  }

  submitForm() {
    this.formError = false;
    if (this.formTodo.value.name === '') {
      this.formError = true;
      return;
    }
    this._todoService.todoControllerCreateTodo(this.formTodo.value).subscribe((newTodo) => {
      this.todoList.push(newTodo);
    })
    this.formTodo.patchValue({
      name: ''
    });
  }

  ngOnInit(): void {
  }

}
