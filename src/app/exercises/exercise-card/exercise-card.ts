import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exercise-card" *ngIf="exercise">
      <div class="exercise-image-container">
        <img [src]="exercise.gifUrl" [alt]="exercise.name" class="exercise-gif" />
      </div>
      <div class="exercise-content">
        <h3 class="exercise-name">{{ exercise.name }}</h3>

        <div class="exercise-section" *ngIf="exercise.bodyParts && exercise.bodyParts.length > 0">
          <span class="section-label">Body Parts</span>
          <div class="badges">
            <span class="badge badge-body-part" *ngFor="let part of exercise.bodyParts">{{ part }}</span>
          </div>
        </div>

        <div class="exercise-section" *ngIf="exercise.targetMuscles && exercise.targetMuscles.length > 0">
          <span class="section-label">Target Muscles</span>
          <div class="badges">
            <span class="badge badge-target" *ngFor="let muscle of exercise.targetMuscles">{{ muscle }}</span>
          </div>
        </div>

        <div class="exercise-section" *ngIf="exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0">
          <span class="section-label">Secondary Muscles</span>
          <div class="badges">
            <span class="badge badge-secondary" *ngFor="let muscle of exercise.secondaryMuscles">{{ muscle }}</span>
          </div>
        </div>

        <div class="exercise-section" *ngIf="exercise.equipments && exercise.equipments.length > 0">
          <span class="section-label">Equipment</span>
          <div class="badges">
            <span class="badge badge-equipment" *ngFor="let item of exercise.equipments">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .exercise-card {
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transition: box-shadow 0.2s ease;
    }

    .exercise-card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);
    }

    .exercise-image-container {
      width: 100%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      height: 220px;
    }

    .exercise-gif {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .exercise-content {
      padding: 16px;
    }

    .exercise-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 12px 0;
      text-transform: capitalize;
    }

    .exercise-section {
      margin-bottom: 10px;
    }

    .section-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }

    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 0.78rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .badge-body-part {
      background-color: #e3f2fd;
      color: #1565c0;
      border: 1px solid #bbdefb;
    }

    .badge-target {
      background-color: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #c8e6c9;
    }

    .badge-secondary {
      background-color: #fff3e0;
      color: #e65100;
      border: 1px solid #ffe0b2;
    }

    .badge-equipment {
      background-color: #f3e5f5;
      color: #6a1b9a;
      border: 1px solid #e1bee7;
    }
  `]
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;
}