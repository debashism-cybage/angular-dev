import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="recipes-dashboard">
      <h1>Recipes</h1>
      <p>This is the recipes page. Your recipes will appear here.</p>
    </div>
  `,
  styles: [`
    .recipes-dashboard {
      padding: 24px;
      max-width: 960px;
      margin: 0 auto;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }

    p {
      font-size: 1rem;
      color: #666;
    }
  `]
})
export class RecipesDashboardComponent {}