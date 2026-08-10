import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recipe-card" *ngIf="recipe">
      <img [src]="recipe.image" [alt]="recipe.name" class="recipe-image" />
      <div class="recipe-details">
        <h2 class="recipe-name">{{ recipe.name }}</h2>
        <div class="recipe-meta">
          <span class="badge cuisine">{{ recipe.cuisine }}</span>
          <span class="badge difficulty">{{ recipe.difficulty }}</span>
          <span class="badge meal-type" *ngFor="let type of recipe.mealType">{{ type }}</span>
        </div>
        <div class="recipe-info">
          <div class="info-item">
            <span class="label">Prep Time:</span>
            <span class="value">{{ recipe.prepTimeMinutes }} min</span>
          </div>
          <div class="info-item">
            <span class="label">Cook Time:</span>
            <span class="value">{{ recipe.cookTimeMinutes }} min</span>
          </div>
          <div class="info-item">
            <span class="label">Servings:</span>
            <span class="value">{{ recipe.servings }}</span>
          </div>
          <div class="info-item">
            <span class="label">Calories/Serving:</span>
            <span class="value">{{ recipe.caloriesPerServing }}</span>
          </div>
          <div class="info-item">
            <span class="label">Rating:</span>
            <span class="value">{{ recipe.rating }} &#9733;</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .recipe-card {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      font-family: Arial, sans-serif;
      color: #333333;
      transition: box-shadow 0.2s ease;
    }

    .recipe-card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .recipe-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .recipe-details {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .recipe-name {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
      color: #222222;
    }

    .recipe-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .badge.cuisine {
      background-color: #e8f4fd;
      color: #1a73e8;
    }

    .badge.difficulty {
      background-color: #fef3e2;
      color: #e67e22;
    }

    .badge.meal-type {
      background-color: #eafaf1;
      color: #27ae60;
    }

    .recipe-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
    }

    .label {
      font-size: 0.7rem;
      color: #888888;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      font-size: 0.9rem;
      font-weight: 600;
      color: #444444;
    }
  `]
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}