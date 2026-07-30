```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalEmployees: number = 0;
  totalPages: number = 0;
  sortField: string = 'name';
  sortOrder: string = 'asc';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    const url = `api/employees?page=${this.currentPage}&size=${this.pageSize}&sort=${this.sortField},${this.sortOrder}`;
    this.http.get<any>(url).subscribe((response: any) => {
      this.employees = response.content;
      this.filteredEmployees = response.content;
      this.totalEmployees = response.totalElements;
      this.totalPages = response.totalPages;
    });
  }

  searchEmployees(): void {
    if (this.searchText.trim()) {
      const searchUrl = `api/employees/search?query=${this.searchText}`;
      this.http.get<Employee[]>(searchUrl).subscribe((employees: Employee[]) => {
        this.filteredEmployees = employees;
        this.totalEmployees = employees.length;
        this.currentPage = 1;
      });
    } else {
      this.getEmployees();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getEmployees();
  }

  onSort(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc'? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.getEmployees();
  }

  viewEmployee(employeeId: number): void {
    // Implement routing to employee detail component
  }
}
```