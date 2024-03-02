import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  newTodo: Todo = { title: '', isCompleted: false };
  subscriptions: Subscription = new Subscription();
  selectedTodo: Todo | null = null;
  errorMessage: string | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    const sub = this.todoService.getTodos().subscribe({
      next: (todos) => this.todos = todos,
      error: (error) => this.handleError('Error fetching todos', error),
    });
    this.subscriptions.add(sub);
  }

  addTodo() {
    if (!this.newTodo.title.trim()) return;

    const sub = this.todoService.addTodo(this.newTodo).subscribe({
      next: (todo) => {
        this.todos.push(todo);
        this.newTodo = { title: '', isCompleted: false }; // Reset the new todo
      },
      error: (error) => this.handleError('Error adding todo', error),
    });
    this.subscriptions.add(sub);
  }

  toggleTodoComplete(todo: Todo) {
    if (!todo._id) {
      this.handleError('Todo ID is undefined', {});
      return;
    }
    const updatedTodo = {
      _id: todo._id,
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
      dueDate: todo.dueDate
    };
    const sub = this.todoService.updateTodo(updatedTodo).subscribe({
      next: () => this.loadTodos(), // Reload todos to reflect the update
      error: (error) => this.handleError('Error updating todo', error),
    });
    this.subscriptions.add(sub);
  }

  removeTodo(todo: Todo) {
    if (!todo._id) return;
    const sub = this.todoService.deleteTodo(todo._id).subscribe({
      next: () => this.todos = this.todos.filter((t) => t._id !== todo._id),
      error: (error) => this.handleError('Error deleting todo', error),
    });
    this.subscriptions.add(sub);
  }

  saveChanges() {
    if (this.selectedTodo && this.selectedTodo._id) {
      const sub = this.todoService.updateTodo(this.selectedTodo).subscribe({
        next: () => {
          this.loadTodos(); // Reload todos to reflect the update
          this.selectedTodo = null; // Clear selection
        },
        error: (error) => this.handleError('Error saving changes', error),
      });
      this.subscriptions.add(sub);
    } else {
      this.handleError('No selected todo to save changes', {});
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleError(message: string, error: any) {
    console.error(message, error);
    this.errorMessage = message;
  }
}
