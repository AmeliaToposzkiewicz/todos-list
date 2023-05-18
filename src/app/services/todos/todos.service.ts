import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Todos } from '../api/api.types';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor() {}

  private todosSubject: Subject<void> = new Subject();
  private todosToEditSubject: Subject<Todos> = new Subject();

  // Metoda emitująca wartości/zdarzenia/eventy w strumieniu
  public emitInfoAboutChanges(): void {
    this.todosSubject.next();
  }

  // Metoda dostarczajaca mechanizm podlaczenia sie do nasluchiwania  w strumieniu danych
  public listenToChanges(): Observable<void> {
    return this.todosSubject.asObservable();
  }

  // Metoda wysyłająca todos'a do edycji
  public emitTodosToEdit(todosToEdit: Todos): void {
    this.todosToEditSubject.next(todosToEdit);
  }

  //Metoda dostarczająca todos'a do edycji
  public listenToTodosEdit(): Observable<Todos> {
    return this.todosToEditSubject.asObservable();
  }
}
