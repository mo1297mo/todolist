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
        console.log("Added Todo:", todo);
        this.todos.push(todo);
        this.newTodo = { title: '', isCompleted: false };
      },
      error: (error) => console.error('Error adding todo:', error),
    });
    this.subscriptions.add(sub);
  }

  toggleTodoComplete(todo: Todo) {
    console.log("Updating todo with ID:", todo._id); // This should not log 'undefined'
    if (!todo._id) {
      console.error("Todo ID is undefined.");
      return;
    }
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: () => this.loadTodos(), // Consider reloading todos to reflect the update
      error: (error) => console.error('Error updating todo:', error),
    });
  }
  

  removeTodo(todo: Todo) {
    if (!todo._id) {
      this.todos = this.todos.filter((t) => t !== todo);
      return;
    }
    const sub = this.todoService.deleteTodo(todo._id).subscribe({
      next: () => this.todos = this.todos.filter((t) => t._id !== todo._id),
      error: (error) => console.error('Error deleting todo:', error),
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
