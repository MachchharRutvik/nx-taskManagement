import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addTasks(taskDetails: any) {
    try {
      return this.http.post('http://localhost:3000/tasks', taskDetails)
    } catch (error: any) {
      return throwError(() => new Error(error))
    }
  }
  getAllTaskDetails() {
    try {
      return this.http.get('http://localhost:3000/tasks')
    } catch (error: any) {
      return throwError(() => new Error(error))

    }
  }
  getTaskDetails(id: any) {
    try {
      return this.http.get('http://localhost:3000/tasks/'+ id)
    } catch (error: any) {
      return throwError(() => new Error(error))
    }
  }
  deleteTaskDetails(id: number) {
    console.log(id, "idsdds")
    try {
      return this.http.delete('http://localhost:3000/tasks/' + id)
    } catch (error: any) {
      return throwError(() => new Error(error))
    }
  }
  editTask(user: any, id: any) {
    console.log(user, "api")
    try {
      return this.http.put('http://localhost:3000/tasks/'+ id, user)
    } catch (error: any) {
      return throwError(() => new Error(error))
    }
  }
  taskCompleted(id: any,task:any) {
    try {
      return this.http.put('http://localhost:3000/tasks/'+ id, {...task,completed: true})
    } catch (error: any) {
      return throwError(() => new Error(error))
    }
  }
}
