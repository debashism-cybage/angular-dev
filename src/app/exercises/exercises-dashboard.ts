import { Component } from '@angular/core';

@Component({
  selector: 'app-exercises-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="exercises-dashboard">
      <h1>Exercises Dashboard</h1>
      <p>Welcome to the Exercises dashboard. Your exercise content will appear here.</p>
    </div>
  `,
  styles: [`
    .exercises-dashboard {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      font-family: sans-serif;
      color: #333;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #1a1a1a;
    }

    p {
      font-size: 1rem;
      color: #555;
    }
  `]
})
export class ExercisesDashboardComponent {}