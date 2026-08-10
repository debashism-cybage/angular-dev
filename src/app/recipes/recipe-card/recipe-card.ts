import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recipe-card" *ngIf="recipe">
      <div class="recipe-image-container">
        <img [src]="recipe.image" [alt]="recipe.name" class="recipe-image" />
      </div>
      <div class="recipe-content">
        <h3 class="recipe-name">{{ recipe.name }}</h3>
        <div class="recipe-tags">
          <span class="tag cuisine">{{ recipe.cuisine }}</span>
          <span class="tag difficulty" [ngClass]="'difficulty-' + recipe.difficulty?.toLowerCase()">{{ recipe.difficulty }}</span>
          <span *ngFor="let meal of recipe.mealType" class="tag meal-type">{{ meal }}</span>
        </div>
        <div class="recipe-info-grid">
          <div class="info-item">
            <span class="info-label">Prep Time</span>
            <span class="info-value">{{ recipe.prepTimeMinutes }} min</span>
          </div>
          <div class="info-item">
            <span class="info-label">Cook Time</span>
            <span class="info-value">{{ recipe.cookTimeMinutes }} min</span>
          </div>
          <div class="info-item">
            <span class="info-label">Servings</span>
            <span class="info-value">{{ recipe.servings }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Calories</span>
            <span class="info-value">{{ recipe.caloriesPerServing }} kcal</span>
          </div>
        </div>
        <div class="recipe-rating">
          <span class="rating-stars">&#9733;</span>
          <span class="rating-value">{{ recipe.rating }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .recipe-card {
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.2s ease, transform 0.2s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .recipe-card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    .recipe-image-container {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .recipe-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .recipe-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .recipe-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 10px 0;
      line-height: 1.3;
    }

    .recipe-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }

    .tag {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .cuisine {
      background-color: #e8f4fd;
      color: #1565c0;
    }

    .difficulty {
      background-color: #f3e5f5;
      color: #6a1b9a;
    }

    .difficulty-easy {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .difficulty-medium {
      background-color: #fff8e1;
      color: #f57f17;
    }

    .difficulty-hard {
      background-color: #fce4ec;
      color: #c62828;
    }

    .meal-type {
      background-color: #fbe9e7;
      color: #bf360c;
    }

    .recipe-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 12px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 8px 10px;
    }

    .info-label {
      font-size: 0.7rem;
      color: #757575;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }

    .info-value {
      font-size: 0.9rem;
      color: #212121;
      font-weight: 600;
    }

    .recipe-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: auto;
      padding-top: 8px;
    }

    .rating-stars {
      color: #f9a825;
      font-size: 1.1rem;
    }

    .rating-value {
      font-size: 0.9rem;
      font-weight: 700;
      color: #424242;
    }
  `]
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}