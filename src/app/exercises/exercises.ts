import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exercises-container">
      <h1>Exercises</h1>
      <p>Exercises dashboard coming soon.</p>
    </div>
  `,
  styles: [`
    .exercises-container {
      padding: 24px;
      max-width: 960px;
      margin: 0 auto;
      font-family: sans-serif;
      color: #333;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 8px;
    }

    p {
      font-size: 1rem;
      color: #666;
    }
  `]
})
export class ExercisesComponent {}