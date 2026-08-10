import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exercise-card" *ngIf="exercise">
      <div class="image-container">
        <img [src]="exercise.gifUrl" [alt]="exercise.name" class="exercise-gif" />
      </div>
      <div class="card-content">
        <h3 class="exercise-name">{{ exercise.name }}</h3>
        <div class="info-section">
          <div class="info-group" *ngIf="exercise.bodyParts && exercise.bodyParts.length">
            <span class="info-label">Body Parts:</span>
            <div class="tags">
              <span class="tag body-part-tag" *ngFor="let part of exercise.bodyParts">{{ part }}</span>
            </div>
          </div>
          <div class="info-group" *ngIf="exercise.targetMuscles && exercise.targetMuscles.length">
            <span class="info-label">Target Muscles:</span>
            <div class="tags">
              <span class="tag target-tag" *ngFor="let muscle of exercise.targetMuscles">{{ muscle }}</span>
            </div>
          </div>
          <div class="info-group" *ngIf="exercise.secondaryMuscles && exercise.secondaryMuscles.length">
            <span class="info-label">Secondary Muscles:</span>
            <div class="tags">
              <span class="tag secondary-tag" *ngFor="let muscle of exercise.secondaryMuscles">{{ muscle }}</span>
            </div>
          </div>
          <div class="info-group" *ngIf="exercise.equipments && exercise.equipments.length">
            <span class="info-label">Equipment:</span>
            <div class="tags">
              <span class="tag equipment-tag" *ngFor="let item of exercise.equipments">{{ item }}</span>
            </div>
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
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      transition: box-shadow 0.2s ease, transform 0.2s ease;
    }

    .exercise-card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);
      transform: translateY(-2px);
    }

    .image-container {
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

    .card-content {
      padding: 16px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .exercise-name {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #1a1a1a;
      text-transform: capitalize;
      line-height: 1.3;
    }

    .info-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .info-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .tag {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .body-part-tag {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .target-tag {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .secondary-tag {
      background-color: #fff3e0;
      color: #e65100;
    }

    .equipment-tag {
      background-color: #f3e5f5;
      color: #6a1b9a;
    }
  `]
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;
}