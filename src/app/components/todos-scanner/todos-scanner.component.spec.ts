import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosScannerComponent } from './todos-scanner.component';

describe('TodosScannerComponent', () => {
  let component: TodosScannerComponent;
  let fixture: ComponentFixture<TodosScannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosScannerComponent]
    });
    fixture = TestBed.createComponent(TodosScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
