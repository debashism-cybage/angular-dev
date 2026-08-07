import { Component } from '@angular/core';

@Component({
  selector: 'app-exercises-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="exercises-dashboard">
      <h1 class="page-title">Exercises</h1>
      <div class="placeholder-content">
        <p>Exercises dashboard coming soon.</p>
      </div>
    </div>
  `,
  styles: [`
    .exercises-dashboard {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      font-family: sans-serif;
    }
    .page-title {
      font-size: 2rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 24px;
    }
    .placeholder-content {
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 32px;
      color: #555;
      font-size: 1rem;
    }
  `]
})
export class ExercisesDashboardComponent {}