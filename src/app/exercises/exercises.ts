import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseService } from '../services/exercise.service';
import { ExerciseCardComponent } from '../exercise-card/exercise-card.component';
import { Exercise, ExercisesResponse } from '../models/exercise.model';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, ExerciseCardComponent],
  template: `
    <div class="exercises-container">
      <h1>Exercises</h1>
      <p>Browse and explore exercises to support your fitness goals.</p>

      @if (loading && exercises().length === 0) {
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading exercises...</p>
        </div>
      }

      @if (error) {
        <div class="error-message">
          <p>{{ error }}</p>
          <button class="retry-btn" (click)="loadExercises()">Retry</button>
        </div>
      }

      @if (!error && exercises().length > 0) {
        <div class="exercises-grid">
          @for (exercise of exercises(); track exercise.id) {
            <app-exercise-card [exercise]="exercise"></app-exercise-card>
          }
        </div>

        @if (hasNextPage()) {
          <div class="load-more-container">
            <button class="load-more-btn" (click)="loadMore()" [disabled]="loading">
              @if (loading) {
                Loading...
              } @else {
                Load More
              }
            </button>
          </div>
        }
      }
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

    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 5px solid #e0e0e0;
      border-top-color: #1976d2;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error-message {
      background-color: #fff3f3;
      border: 1px solid #f5c6cb;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      color: #c0392b;
    }

    .retry-btn {
      margin-top: 0.75rem;
      padding: 0.5rem 1.5rem;
      background-color: #1976d2;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .retry-btn:hover {
      background-color: #1565c0;
    }

    .exercises-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .load-more-container {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    .load-more-btn {
      padding: 0.75rem 2.5rem;
      background-color: #1976d2;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .load-more-btn:hover:not(:disabled) {
      background-color: #1565c0;
    }

    .load-more-btn:disabled {
      background-color: #90caf9;
      cursor: not-allowed;
    }
  `]
})
export class ExercisesComponent implements OnInit {
  exercises = signal<Exercise[]>([]);
  loading = false;
  error: string | null = null;
  hasNextPage = signal<boolean>(false);
  nextCursor = signal<string | null>(null);

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.loading = true;
    this.error = null;
    this.exercises.set([]);
    this.nextCursor.set(null);
    this.hasNextPage.set(false);

    this.exerciseService.getExercises().subscribe({
      next: (response: ExercisesResponse) => {
        this.exercises.set(response.data);
        this.hasNextPage.set(response.hasNextPage);
        this.nextCursor.set(response.nextCursor ?? null);
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load exercises. Please try again.';
        this.loading = false;
      }
    });
  }

  loadMore(): void {
    if (!this.hasNextPage() || !this.nextCursor() || this.loading) {
      return;
    }

    this.loading = true;

    this.exerciseService.getExercises(this.nextCursor()!).subscribe({
      next: (response: ExercisesResponse) => {
        this.exercises.set([...this.exercises(), ...response.data]);
        this.hasNextPage.set(response.hasNextPage);
        this.nextCursor.set(response.nextCursor ?? null);
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load more exercises. Please try again.';
        this.loading = false;
      }
    });
  }
}