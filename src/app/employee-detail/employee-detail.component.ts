src/app/employee-detail/employee-detail.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee | undefined;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.employeeService.getEmployeeById(+employeeId).subscribe(employee => {
        this.employee = employee;
      });
    }
  }

}
```

src/app/employee-detail/employee-detail.component.html

```html
<div *ngIf="employee" class="employee-detail">
  <h2>{{ employee.name }}</h2>
  <p><strong>Position:</strong> {{ employee.position }}</p>
  <p><strong>Office:</strong> {{ employee.office }}</p>
  <p><strong>Age:</strong> {{ employee.age }}</p>
  <p><strong>Start Date:</strong> {{ employee.startDate | date }}</p>
  <p><strong>Salary:</strong> {{ employee.salary }}</p>
</div>
```