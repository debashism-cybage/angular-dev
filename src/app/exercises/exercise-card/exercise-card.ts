import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exercise-card" *ngIf="exercise">
      <div class="exercise-card__image-container">
        <img
          [src]="exercise.gifUrl"
          [alt]="exercise.name"
          class="exercise-card__gif"
        />
      </div>
      <div class="exercise-card__content">
        <h3 class="exercise-card__name">{{ exercise.name }}</h3>

        <div class="exercise-card__section" *ngIf="exercise.bodyParts && exercise.bodyParts.length > 0">
          <span class="exercise-card__label">Body Parts</span>
          <div class="exercise-card__badges">
            <span class="badge badge--body" *ngFor="let part of exercise.bodyParts">{{ part }}</span>
          </div>
        </div>

        <div class="exercise-card__section" *ngIf="exercise.targetMuscles && exercise.targetMuscles.length > 0">
          <span class="exercise-card__label">Target Muscles</span>
          <div class="exercise-card__badges">
            <span class="badge badge--target" *ngFor="let muscle of exercise.targetMuscles">{{ muscle }}</span>
          </div>
        </div>

        <div class="exercise-card__section" *ngIf="exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0">
          <span class="exercise-card__label">Secondary Muscles</span>
          <div class="exercise-card__badges">
            <span class="badge badge--secondary" *ngFor="let muscle of exercise.secondaryMuscles">{{ muscle }}</span>
          </div>
        </div>

        <div class="exercise-card__section" *ngIf="exercise.equipments && exercise.equipments.length > 0">
          <span class="exercise-card__label">Equipment</span>
          <div class="exercise-card__badges">
            <span class="badge badge--equipment" *ngFor="let item of exercise.equipments">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .exercise-card {
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
    }

    .exercise-card__image-container {
      width: 100%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .exercise-card__gif {
      width: 100%;
      max-width: 280px;
      height: 200px;
      object-fit: contain;
      border-radius: 4px;
    }

    .exercise-card__content {
      padding: 16px;
      flex: 1;
    }

    .exercise-card__name {
      font-size: 1rem;
      font-weight: 600;
      color: #212121;
      margin: 0 0 12px 0;
      text-transform: capitalize;
    }

    .exercise-card__section {
      margin-bottom: 10px;
    }

    .exercise-card__label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      color: #757575;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .exercise-card__badges {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .badge--body {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .badge--target {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .badge--secondary {
      background-color: #fff3e0;
      color: #e65100;
    }

    .badge--equipment {
      background-color: #f3e5f5;
      color: #6a1b9a;
    }
  `]
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;
}