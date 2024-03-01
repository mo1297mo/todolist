import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public apiUrl = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      catchError(this.handleError)
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todo._id}`, todo).pipe(
      catchError(this.handleError)
    );
  }

  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }
}
