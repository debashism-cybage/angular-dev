```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Employee {
  id: number;
  name: string;
  employeeId: string;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://api.example.com/employees';

  constructor(private http: HttpClient) { }

  searchEmployees(query: string, page: number = 1, pageSize: number = 10, sortField: string = 'name', sortOrder: 'asc' | 'desc' = 'asc'): Observable<any> {
    const params = new HttpParams()
     .set('q', query)
     .set('page', page.toString())
     .set('pageSize', pageSize.toString())
     .set('sortField', sortField)
     .set('sortOrder', sortOrder);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        return {
          data: response.data,
          total: response.total,
          page: response.page,
          pageSize: response.pageSize
        };
      })
    );
  }

  getEmployeeDetails(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`);
  }
}
```