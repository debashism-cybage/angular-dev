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
        <!-- Future API integration: https://dummyjson.com/recipes -->
      </div>
    </div>
  `,
  styles: [`
    .recipes-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #333;
    }

    p {
      color: #666;
      margin-bottom: 1rem;
    }

    .recipes-placeholder {
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class RecipesComponent {}