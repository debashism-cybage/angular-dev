import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exercise-card" *ngIf="exercise">
      <div class="exercise-card__header">
        <h2 class="exercise-card__name">{{ exercise.name }}</h2>
      </div>
      <div class="exercise-card__image-container">
        <img
          class="exercise-card__gif"
          [src]="exercise.gifUrl"
          [alt]="exercise.name"
        />
      </div>
      <div class="exercise-card__details">
        <div class="exercise-card__section" *ngIf="exercise.bodyParts && exercise.bodyParts.length > 0">
          <span class="exercise-card__label">Body Parts</span>
          <div class="exercise-card__badges">
            <span class="badge badge--body-part" *ngFor="let part of exercise.bodyParts">{{ part }}</span>
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
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.2s ease, transform 0.2s ease;
      display: flex;
      flex-direction: column;
    }

    .exercise-card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .exercise-card__header {
      padding: 16px 16px 8px;
    }

    .exercise-card__name {
      font-size: 1rem;
      font-weight: 600;
      color: #1a202c;
      margin: 0;
      text-transform: capitalize;
      line-height: 1.4;
    }

    .exercise-card__image-container {
      width: 100%;
      background-color: #f7fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
    }

    .exercise-card__gif {
      width: 100%;
      max-width: 280px;
      height: 200px;
      object-fit: contain;
      border-radius: 8px;
    }

    .exercise-card__details {
      padding: 12px 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }

    .exercise-card__section {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .exercise-card__label {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #718096;
    }

    .exercise-card__badges {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .badge--body-part {
      background-color: #ebf8ff;
      color: #2b6cb0;
    }

    .badge--target {
      background-color: #f0fff4;
      color: #276749;
    }

    .badge--secondary {
      background-color: #faf5ff;
      color: #6b46c1;
    }

    .badge--equipment {
      background-color: #fffaf0;
      color: #c05621;
    }
  `]
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;
}