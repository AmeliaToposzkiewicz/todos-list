import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { TodosList } from 'src/app/services/api/api.types';
import { TODOS_CHANGED_EVENT_NAME } from '../todos-scanner/todos-scanner.component';
import { TodosService } from 'src/app/services/todos/todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
})
export class TodosListComponent implements OnInit, OnDestroy {
  // Zdefiniowanie pojemnika (zmiennej) na dane
  todos: TodosList = [];

  constructor(
    private apiService: ApiService,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    //Pobieranie danych przy uruchomieniu komponentu
    this.getTodosData();

    //Pobieranie danych przy odbieraniu eventu
    // window.addEventListener(TODOS_CHANGED_EVENT_NAME, this.getTodosData);

    // Nasłuchiwanie na zdarzenia
    this.todosService.listenToChanges().subscribe(() => {
      this.getTodosData();
    });
  }

  ngOnDestroy(): void {
    // window.removeEventListener(TODOS_CHANGED_EVENT_NAME, this.getTodosData);
  }

  getTodosData(): void {
    this.apiService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }
}
