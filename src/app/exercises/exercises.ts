import { Component } from '@angular/core';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [],
  template: `
    <div class="exercises-container">
      <h1 class="page-title">Exercises</h1>
      <p class="page-description">Browse and discover exercises to support your fitness journey.</p>
      <div class="content-placeholder">
        <p>Exercise content will be loaded from the ExerciseDB API.</p>
      </div>
    </div>
  `,
  styles: [`
    .exercises-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    .page-description {
      font-size: 1rem;
      color: #555555;
      margin-bottom: 24px;
    }

    .content-placeholder {
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 32px;
      text-align: center;
      color: #777777;
      font-size: 0.95rem;
    }
  `]
})
export class ExercisesComponent {}