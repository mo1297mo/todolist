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

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    const sub = this.todoService.getTodos().subscribe({
      next: (todos) => this.todos = todos,
      error: (error) => console.error('Error fetching todos:', error),
    });
    this.subscriptions.add(sub);
  }

  addTodo() {
    if (!this.newTodo.title.trim()) return;
    const sub = this.todoService.addTodo(this.newTodo).subscribe({
      next: (todo) => {
        this.todos.push(todo);
        this.newTodo = { title: '', isCompleted: false };
      },
      error: (error) => console.error('Error adding todo:', error),
    });
    this.subscriptions.add(sub);
  }

  toggleTodoComplete(todo: Todo) {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    const sub = this.todoService.updateTodo(updatedTodo).subscribe({
      error: (error) => console.error('Error updating todo:', error),
    });
    this.subscriptions.add(sub);
  }

  removeTodo(todo: Todo) {
    if (!todo.id) {
      this.todos = this.todos.filter((t) => t !== todo);
      return;
    }
    const sub = this.todoService.deleteTodo(todo.id).subscribe({
      next: () => this.todos = this.todos.filter((t) => t.id !== todo.id),
      error: (error) => console.error('Error deleting todo:', error),
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
