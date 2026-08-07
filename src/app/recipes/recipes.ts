import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [],
  template: `
    <div class="recipes-container">
      <h1 class="page-title">Recipes</h1>
      <p class="page-description">Browse and discover delicious recipes.</p>
      <div class="content-placeholder">
        <p>Recipes will be loaded from the API.</p>
      </div>
    </div>
  `,
  styles: [`
    .recipes-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 8px;
    }

    .page-description {
      font-size: 1rem;
      color: #555577;
      margin-bottom: 24px;
    }

    .content-placeholder {
      background-color: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 32px;
      text-align: center;
      color: #888888;
    }
  `]
})
export class RecipesComponent {}