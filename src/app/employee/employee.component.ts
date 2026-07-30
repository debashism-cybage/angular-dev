```typescript
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  pageSize = 10;
  currentPage = 0;
  totalEmployees = 0;
  totalPages = 0;
  searchTerm = new Subject<string>();

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.employeeService.searchEmployees(term))
    ).subscribe(data => {
      this.employees = data.results;
      this.totalEmployees = data.total;
      this.totalPages = Math.ceil(this.totalEmployees / this.pageSize);
      this.updateFilteredEmployees();
    });
  }

  search(term: string): void {
    this.searchTerm.next(term);
  }

  openEmployeeDetail(employee: any): void {
    this.dialog.open(EmployeeDetailComponent, {
      data: employee
    });
  }

  updateFilteredEmployees(): void {
    this.filteredEmployees = this.employees.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updateFilteredEmployees();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateFilteredEmployees();
    }
  }
}
```