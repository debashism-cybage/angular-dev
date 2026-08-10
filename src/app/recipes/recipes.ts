import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recipes-container">
      <h1>Recipes</h1>
      <p>Browse and discover delicious recipes.</p>
      <div class="recipes-placeholder">
        <p>Recipes will be loaded here from the API.</p>
        <!-- Future integration: https://dummyjson.com/recipes -->
      </div>
    </div>
  `,
  styles: [`
    .recipes-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    p {
      color: #555;
      font-size: 1rem;
      margin-bottom: 16px;
    }

    .recipes-placeholder {
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 24px;
      text-align: center;
      color: #888;
    }
  `]
})
export class RecipesComponent {}
