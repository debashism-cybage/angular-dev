src/app/employee/employee.service.ts
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://api.example.com/employees'; // Replace with actual API URL

  constructor(private http: HttpClient) { }

  getEmployees(page: number = 1, pageSize: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${pageSize}`).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError<any>('getEmployees'))
    );
  }

  searchEmployees(query: string, page: number = 1, pageSize: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}&page=${page}&size=${pageSize}`).pipe(
      tap(data => console.log('Search: ', JSON.stringify(data))),
      catchError(this.handleError<any>('searchEmployees'))
    );
  }

  getEmployeeDetails(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`).pipe(
      tap(employee => console.log('Details: ', JSON.stringify(employee))),
      catchError(this.handleError<Employee>(`getEmployeeDetails`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
```