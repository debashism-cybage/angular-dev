import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// API endpoint for exercises data: https://oss.exercisedb.dev/api/v1/exercises

@Component({
  selector: 'app-exercises-dashboard',
  standalone: true,
  imports: [CommonModule],
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
    }

    .page-title {
      font-size: 2rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 24px;
    }

    .placeholder-content {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 32px;
      text-align: center;
      color: #6b7280;
      font-size: 1rem;
    }
  `]
})
export class ExercisesDashboardComponent {}