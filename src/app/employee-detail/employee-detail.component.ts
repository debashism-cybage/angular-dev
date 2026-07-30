```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee | undefined;
  searchControl = new FormControl();
  filteredEmployees: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.employeeService.getEmployeeById(id).subscribe(employee => this.employee = employee);
    });

    this.filteredEmployees = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.employeeService.searchEmployees(value))
    );
  }

  searchEmployees(query: string): void {
    this.employeeService.searchEmployees(query).subscribe(employees => this.employee = employees.find(emp => emp.id === Number(this.route.snapshot.paramMap.get('id'))));
  }

}
```