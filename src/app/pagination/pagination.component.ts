```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, debounceTime, switchMap } from 'rxjs';

interface Employee {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  employees: Employee[] = [];
  displayedEmployees: Employee[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  error: string | null = null;
  currentPage: number = 1;
  pageSize: number = 10;
  totalEmployees: number = 0;
  totalPages: number = 0;

  private searchTermSubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchTermSubject
     .pipe(
        debounceTime(300),
        switchMap(term => this.searchEmployees(term))
      )
      .subscribe({
        next: data => {
          this.employees = data.employees;
          this.totalEmployees = data.total;
          this.totalPages = Math.ceil(this.totalEmployees / this.pageSize);
          this.displayedEmployees = this.employees.slice(0, this.pageSize);
        },
        error: err => this.error = 'Failed to fetch employees'
      });

    this.searchTermSubject.next('');
  }

  searchEmployees(term: string): Observable<any> {
    const url = `https://api.example.com/employees?search=${term}&page=${this.currentPage}&size=${this.pageSize}`;
    return this.http.get<any>(url);
  }

  search(term: string): void {
    this.searchTerm = term;
    this.searchTermSubject.next(term);
    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.search(this.searchTerm);
  }

  viewEmployee(id: number): void {
    // Navigate to employee details page
  }

  trackByEmployee(index: number, employee: Employee): number {
    return employee.id;
  }

  get isLastPage(): boolean {
    return this.currentPage >= this.totalPages;
  }

  get isFirstPage(): boolean {
    return this.currentPage <= 1;
  }

  nextPage(): void {
    if (!this.isLastPage) {
      this.currentPage++;
      this.search(this.searchTerm);
    }
  }

  prevPage(): void {
    if (!this.isFirstPage) {
      this.currentPage--;
      this.search(this.searchTerm);
    }
  }
}
```