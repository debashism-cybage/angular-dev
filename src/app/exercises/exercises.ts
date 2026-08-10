import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseService } from './exercise.service';
import { ExerciseCardComponent } from './exercise-card/exercise-card.component';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, ExerciseCardComponent],
  template: `
    <div class="exercises-container">
      <h1>Exercises</h1>
      <p>Browse and explore exercises to support your fitness goals.</p>

      @if (loading()) {
        <div class="loading-indicator">
          <div class="spinner"></div>
          <p>Loading exercises...</p>
        </div>
      }

      @if (error()) {
        <div class="error-message">
          <p>{{ error() }}</p>
        </div>
      }

      @if (!loading() || exercises().length > 0) {
        <div class="exercises-grid">
          @for (exercise of exercises(); track exercise.id) {
            <app-exercise-card [exercise]="exercise"></app-exercise-card>
          }
        </div>
      }

      @if (hasNextPage() && !loading()) {
        <div class="load-more-container">
          <button class="load-more-btn" (click)="loadMore()">Load More</button>
        </div>
      }
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

    .exercises-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .loading-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      color: #555;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e0e0e0;
      border-top-color: #1976d2;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error-message {
      background-color: #fdecea;
      border: 1px solid #f44336;
      border-radius: 8px;
      padding: 1rem 1.5rem;
      color: #b71c1c;
      margin-bottom: 1rem;
    }

    .load-more-container {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    .load-more-btn {
      background-color: #1976d2;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      padding: 0.75rem 2rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .load-more-btn:hover {
      background-color: #1565c0;
    }
  `]
})
export class ExercisesComponent implements OnInit {
  exercises = signal<Exercise[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  hasNextPage = signal<boolean>(false);
  nextCursor = signal<string | null>(null);

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.fetchExercises();
  }

  private fetchExercises(cursor?: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.exerciseService.getExercises(cursor).subscribe({
      next: (response: any) => {
        if (cursor) {
          this.exercises.update(existing => [...existing, ...response.data]);
        } else {
          this.exercises.set(response.data);
        }
        this.hasNextPage.set(response.hasNextPage);
        this.nextCursor.set(response.nextCursor ?? null);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.error.set('Failed to load exercises. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  loadMore(): void {
    if (this.hasNextPage() && this.nextCursor()) {
      this.fetchExercises(this.nextCursor()!);
    }
  }
}