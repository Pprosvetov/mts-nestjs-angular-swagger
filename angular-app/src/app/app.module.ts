import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { ApiModule, BASE_PATH } from './api';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    ApiModule
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: 'http://localhost:3000'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
