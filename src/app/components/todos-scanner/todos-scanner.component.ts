import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { TodosService } from 'src/app/services/todos/todos.service';
import { v4 } from 'uuid';

export const TODOS_CHANGED_EVENT_NAME = 'todos-changed';
export enum TodosScannerViewEnum {
  AddView,
  EditView,
}
@Component({
  selector: 'app-todos-scanner',
  templateUrl: './todos-scanner.component.html',
  styleUrls: ['./todos-scanner.component.css'],
})
export class TodosScannerComponent implements OnInit {
  todoName: string = '';
  todoDescription: string = '';
  currentScannerViewType: TodosScannerViewEnum = TodosScannerViewEnum.AddView;
  todosToEditId: string | null = null;

  @Output('todos-changed') todosChanged = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.todosService.listenToTodosEdit().subscribe((todoToEdit) => {
      // Wprowadzenie danych
      this.todoName = todoToEdit.name;
      this.todoDescription = todoToEdit.description;

      // Zmiana typu działania scannera na edit
      this.currentScannerViewType = TodosScannerViewEnum.EditView;
      // Id elementu do edycji
      this.todosToEditId = todoToEdit.id;
    });
  }

  onClick() {
    if (this.currentScannerViewType === TodosScannerViewEnum.AddView) {
      this.saveTodos();
    } else {
      this.editTodos();
    }
  }
  backToAddMode() {
    this.currentScannerViewType = TodosScannerViewEnum.AddView;
    this.todosToEditId = null;
    this.todoName = '';
    this.todoDescription = '';
  }

  editTodos() {
    // Klauzula strażnicza
    if (!this.todosToEditId) {
      return;
    }
    this.apiService
      .editTodos(this.todosToEditId, {
        id: this.todosToEditId,
        name: this.todoName,
        description: this.todoDescription,
      })
      .subscribe(() => {
        // Czyszczenie wartości z formularza
        this.todoName = '';
        this.todoDescription = '';

        // Powrót do modu dodawania / default'owego
        this.currentScannerViewType = TodosScannerViewEnum.AddView;
        this.todosToEditId = null;

        // Emitowanie informacji o zmianie
        this.todosService.emitInfoAboutChanges();
      });
  }

  saveTodos() {
    this.apiService
      .addTodos({
        id: v4(),
        name: this.todoName,
        description: this.todoDescription,
      })
      .subscribe(() => {
        this.todoName = '';
        this.todoDescription = '';

        //Tworzenie eventu
        // const event = new CustomEvent(TODOS_CHANGED_EVENT_NAME);
        //Wysłanie eventu
        // window.dispatchEvent(event);

        //Emitowanie zdarzenia za pomoca serwisu
        this.todosService.emitInfoAboutChanges();
      });
  }
}
