import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseService } from '../services/exercise.service';
import { Exercise, ExercisesResponse } from '../models/exercise.model';
import { ExerciseCardComponent } from './exercise-card/exercise-card';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, ExerciseCardComponent],
  template: `
    <div class="exercises-container">
      <h1>Exercises</h1>
      <p>Browse and explore exercises to support your fitness goals.</p>

      @if (loading()) {
        <div class="loading-state">
          <p>Loading exercises...</p>
        </div>
      }

      @if (error()) {
        <div class="error-state">
          <p>{{ error() }}</p>
        </div>
      }

      @if (!loading() && !error()) {
        <div class="exercises-grid">
          @for (exercise of exercises(); track exercise.exerciseId) {
            <app-exercise-card [exercise]="exercise"></app-exercise-card>
          }
        </div>

        @if (hasNextPage) {
          <div class="load-more-container">
            <button class="load-more-btn" (click)="loadMore()">Load More</button>
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

    .loading-state {
      background-color: #f5f5f5;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      color: #888;
    }

    .error-state {
      background-color: #fff0f0;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      color: #cc0000;
    }

    .exercises-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .load-more-container {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    .load-more-btn {
      background-color: #4f46e5;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      padding: 0.75rem 2rem;
      font-size: 1rem;
      cursor: pointer;
    }

    .load-more-btn:hover {
      background-color: #4338ca;
    }
  `]
})
export class ExercisesComponent implements OnInit {
  exercises = signal<Exercise[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  hasNextPage = false;
  nextCursor: string | null = null;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.loading.set(true);
    this.error.set(null);
    this.exerciseService.getExercises().subscribe({
      next: (response: ExercisesResponse) => {
        this.exercises.set(response.data);
        this.hasNextPage = response.hasNextPage;
        this.nextCursor = response.nextCursor ?? null;
        this.loading.set(false);
      },
      error: (err: any) => {
        this.error.set('Failed to load exercises. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  loadMore(): void {
    if (!this.hasNextPage || !this.nextCursor) return;
    this.loading.set(true);
    this.exerciseService.getExercises(this.nextCursor).subscribe({
      next: (response: ExercisesResponse) => {
        this.exercises.update(current => [...current, ...response.data]);
        this.hasNextPage = response.hasNextPage;
        this.nextCursor = response.nextCursor ?? null;
        this.loading.set(false);
      },
      error: (err: any) => {
        this.error.set('Failed to load more exercises. Please try again later.');
        this.loading.set(false);
      }
    });
  }
}