import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Todos } from 'src/app/services/api/api.types';
import { TodosService } from 'src/app/services/todos/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  @Input() todo!: Todos;

  constructor(
    private apiService: ApiService,
    private todosService: TodosService
  ) {}

  deleteTodos() {
    this.apiService.deleteTodos(this.todo.id).subscribe(() => {
      this.todosService.emitInfoAboutChanges();
    });
  }

  editTodos() {
    this.todosService.emitTodosToEdit(this.todo);
  }
}
