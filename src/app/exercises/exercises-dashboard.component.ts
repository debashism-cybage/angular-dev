import { Component } from '@angular/core';

@Component({
  selector: 'app-exercises-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="exercises-dashboard">
      <h1>Exercises</h1>
      <p>This is the exercises page. Your exercise content will appear here.</p>
    </div>
  `,
  styles: [`
    .exercises-dashboard {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      color: #6b7280;
    }
  `]
})
export class ExercisesDashboardComponent {}