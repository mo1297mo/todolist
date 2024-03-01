import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { title: '', isCompleted: false };

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo).subscribe((todo) => {
      this.todos.push(todo);
      this.newTodo = { title: '', isCompleted: false }; // Reset the new todo
    });
  }

  toggleTodoComplete(todo: Todo) {
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo).subscribe();
  }

  removeTodo(todo: Todo) {
    if (todo.id) {
      this.todoService.deleteTodo(todo.id).subscribe(() => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
      });
    } else {
      // Handle the case where todo.id is undefined, e.g., remove it from the view if it was never saved to the database
      this.todos = this.todos.filter((t) => t !== todo);
    }
  }
  
}
