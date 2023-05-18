import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todos, TodosList } from './api.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Wstrzyknięcie mechanizmu dostępu http czyli http: HttpClient
  constructor(private http: HttpClient) {}

  // Zdefiniowanie ścieżki głównej do BE
  private baseUrl: string = 'http://localhost:3000';

  // Metoda pobierająca dane o todos'ach
  getTodos(): Observable<TodosList> {
    return this.http.get<TodosList>(`${this.baseUrl}/todos`);
  }

  // Metoda wstawiająca dane
  addTodos(todos: Todos): Observable<any> {
    return this.http.post(`${this.baseUrl}/todos`, todos);
  }

  //Metoda usuwająca dane
  deleteTodos(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/todos/${id}`);
  }

  //Metoda do edycji todos'a
  editTodos(id: string, todos: Todos): Observable<any> {
    return this.http.patch(`${this.baseUrl}/todos/${id}`, todos);
  }
}
