import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exercise-card">
      <h3 class="exercise-name">{{ exercise.name }}</h3>
      @if (exercise.description) {
        <p class="exercise-description">{{ exercise.description }}</p>
      }
    </div>
  `,
  styles: [`
    .exercise-card {
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: box-shadow 0.2s ease;
    }

    .exercise-card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .exercise-name {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
      color: #1a1a1a;
    }

    .exercise-description {
      font-size: 0.9rem;
      color: #555;
      margin: 0;
    }
  `]
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;
}