import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recipe-card" [class.dark]="themeService.isDarkMode()" *ngIf="recipe">
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
      --card-bg: #ffffff;
      --card-color: #333333;
      --card-name-color: #222222;
      --card-label-color: #888888;
      --card-value-color: #444444;
      --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      --card-shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.15);
      --badge-cuisine-bg: #e8f4fd;
      --badge-cuisine-color: #1a73e8;
      --badge-difficulty-bg: #fef3e2;
      --badge-difficulty-color: #e67e22;
      --badge-meal-type-bg: #eafaf1;
      --badge-meal-type-color: #27ae60;

      background-color: var(--card-bg);
      border-radius: 8px;
      box-shadow: var(--card-shadow);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      font-family: Arial, sans-serif;
      color: var(--card-color);
      transition: box-shadow 0.2s ease;
    }

    .recipe-card.dark {
      --card-bg: #1e1e2e;
      --card-color: #e0e0e0;
      --card-name-color: #f5f5f5;
      --card-label-color: #aaaaaa;
      --card-value-color: #cccccc;
      --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      --card-shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.7);
      --badge-cuisine-bg: #1a3a5c;
      --badge-cuisine-color: #7ab8f5;
      --badge-difficulty-bg: #3d2b0a;
      --badge-difficulty-color: #f0a050;
      --badge-meal-type-bg: #0d3320;
      --badge-meal-type-color: #5dd88a;
    }

    .recipe-card:hover {
      box-shadow: var(--card-shadow-hover);
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
      color: var(--card-name-color);
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
      background-color: var(--badge-cuisine-bg);
      color: var(--badge-cuisine-color);
    }

    .badge.difficulty {
      background-color: var(--badge-difficulty-bg);
      color: var(--badge-difficulty-color);
    }

    .badge.meal-type {
      background-color: var(--badge-meal-type-bg);
      color: var(--badge-meal-type-color);
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
      color: var(--card-label-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--card-value-color);
    }
  `]
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  constructor(public themeService: ThemeService) {}
}