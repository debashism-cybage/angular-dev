```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, debounceTime, switchMap } from 'rxjs';
import { PaginationService } from '../services/pagination.service';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  loading = false;
  error: string | null = null;
  searchTerm = new Subject<string>();
  currentPage = 1;
  pageSize = 10;

  constructor(private http: HttpClient, private employeeService: EmployeeService, private paginationService: PaginationService) {}

  ngOnInit(): void {
    this.searchTerm.pipe(
      debounceTime(300),
      switchMap(term => this.employeeService.searchEmployees(term, this.currentPage, this.pageSize))
    ).subscribe({
      next: (data: { employees: Employee[], total: number }) => {
        this.employees = data.employees;
        this.paginationService.setPaginationData(data.total, this.currentPage, this.pageSize);
      },
      error: () => this.error = 'Failed to load employees',
      complete: () => this.loading = false
    });
  }

  searchEmployees(term: string): void {
    this.loading = true;
    this.error = null;
    this.searchTerm.next(term);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.searchEmployees('');
  }

  viewEmployeeDetails(employee: Employee): void {
    this.selectedEmployee = employee;
  }
}
```