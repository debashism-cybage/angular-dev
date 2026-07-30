```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, debounceTime, switchMap } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  employees: Employee[] = [];
  totalEmployees = 0;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  loading = false;
  error = null;
  searchTerm: Subject<string> = new Subject<string>();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.searchTerm.pipe(
      debounceTime(300),
      switchMap(term => this.employeeService.searchEmployees(term, this.currentPage, this.pageSize))
    ).subscribe(
      (data: { employees: Employee[], total: number }) => {
        this.employees = data.employees;
        this.totalEmployees = data.total;
        this.updatePageInfo();
      },
      error => this.error = error
    );
  }

  ngOnDestroy(): void {
    this.searchTerm.unsubscribe();
  }

  search(term: string): void {
    this.searchTerm.next(term);
  }

  pageChanged(page: number): void {
    this.currentPage = page;
    this.search('');
  }

  updatePageInfo(): void {
    this.totalPages = Math.ceil(this.totalEmployees / this.pageSize);
  }

  viewEmployee(employeeId: number): void {
    // Navigate to employee details
  }

}
```