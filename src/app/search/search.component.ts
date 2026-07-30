src/app/search/search.component.ts
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, debounceTime, switchMap, catchError } from 'rxjs';

interface Employee {
  id: number;
  name: string;
  position: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchTerm$ = new BehaviorSubject<string>('');
  employees: Employee[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalEmployees: number = 0;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchTerm$.pipe(
      debounceTime(300),
      switchMap(term => this.searchEmployees(term))
    ).subscribe({
      next: data => {
        this.employees = data.results;
        this.totalEmployees = data.total;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = 'Error fetching employees';
        this.loading = false;
      }
    });
  }

  searchEmployees(term: string): Observable<any> {
    this.loading = true;
    return this.http.get<any>('/api/employees', {
      params: {
        name: term,
        page: this.currentPage.toString(),
        size: this.pageSize.toString()
      }
    }).pipe(
      catchError(err => {
        this.loading = false;
        throw err;
      })
    );
  }

  onSearch(term: string): void {
    this.searchTerm$.next(term);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.searchTerm$.next(this.searchTerm$.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```