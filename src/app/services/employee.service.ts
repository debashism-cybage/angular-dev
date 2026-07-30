```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, debounceTime, switchMap, catchError } from 'rxjs';

interface Employee {
  id: number;
  name: string;
  // Add other employee properties here
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://api.example.com/employees'; // Replace with your actual API URL
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) { }

  searchEmployees(query: string): Observable<Employee[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<Employee[]>(`${this.apiUrl}`, { params: { name: query } })
     .pipe(
        debounceTime(300),
        switchMap((employees: Employee[]) => {
          this.employeesSubject.next(employees);
          this.loadingSubject.next(false);
          return this.employees$;
        }),
        catchError((error: HttpErrorResponse) => {
          this.loadingSubject.next(false);
          this.errorSubject.next(error.message);
          return throwError(error);
        })
      );
  }

  getEmployees(page: number, pageSize: number): Observable<Employee[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<Employee[]>((`${this.apiUrl}`, {
      params: {
        page,
        pageSize
      }
    }))
      .pipe(
        switchMap((employees: Employee[]) => {
          this.employeesSubject.next(employees);
          this.loadingSubject.next(false);
          return this.employees$;
        }),
        catchError((error: HttpErrorResponse) => {
          this.loadingSubject.next(false);
          this.errorSubject.next(error.message);
          return throwError(error);
        })
      );
  }

  getEmployeeDetails(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  clearError() {
    this.errorSubject.next(null);
  }
}
```