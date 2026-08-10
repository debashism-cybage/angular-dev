import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exercises-container">
      <h1>Exercises</h1>
      <p>Browse and discover exercises to support your fitness journey.</p>
      <div class="placeholder-content">
        <p>Exercise library coming soon.</p>
        <p class="api-note">Data will be powered by the ExerciseDB API.</p>
      </div>
    </div>
  `,
  styles: [`
    .exercises-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #1a1a1a;
    }

    p {
      color: #555;
      margin-bottom: 1rem;
    }

    .placeholder-content {
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      margin-top: 1.5rem;
    }

    .api-note {
      font-size: 0.875rem;
      color: #888;
    }
  `]
})
export class ExercisesComponent {}