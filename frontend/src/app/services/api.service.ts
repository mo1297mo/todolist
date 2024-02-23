import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://localhost:3000'; // Adjust if your backend URL is different

  constructor(private http: HttpClient) { }

  // Example method to retrieve data from the backend
  getData() {
    return this.http.get(`${this.BASE_URL}/your-endpoint`);
  }

  // Add more methods as needed for POST, PUT, DELETE, etc.
}
