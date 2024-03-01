import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './app/features/services/todo.service'; // Adjust the path to your TodoService

describe('TodoService', () => {
  let service: TodoService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should update a todo item', () => {
    const mockTodo = { id: '123', title: 'Test Todo', isCompleted: false };
    const updatedTodo = { ...mockTodo, title: 'Updated Test Todo', isCompleted: true };

    service.updateTodo(updatedTodo).subscribe(todo => {
      expect(todo).toEqual(updatedTodo);
    });

    const req = httpController.expectOne(`${service.apiUrl}/${mockTodo.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTodo); // Simulate a response from the backend
  });

  // Add more tests here for error handling, etc.
});
