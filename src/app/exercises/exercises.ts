import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exercises-container">
      <h1>Exercises</h1>
      <p>Browse and explore exercises to support your fitness goals.</p>
      <div class="placeholder-content">
        <p>Exercise data coming soon.</p>
        <!-- Future API integration: https://oss.exercisedb.dev/api/v1/exercises -->
      </div>
    </div>
  `,
  styles: [`
    .exercises-container {
      padding: 2rem;
      max-width: 900px;
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
      background-color: #f5f5f5;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      color: #888;
    }
  `]
})
export class ExercisesComponent {}
