import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="recipes-dashboard">
      <h1 class="page-title">Recipes</h1>
      <div class="placeholder-content">
        <p>Recipes dashboard content coming soon.</p>
      </div>
    </div>
  `,
  styles: [`
    .recipes-dashboard {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-title {
      font-size: 28px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 24px;
    }

    .placeholder-content {
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 24px;
      color: #555555;
      font-size: 16px;
    }
  `]
})
export class RecipesDashboardComponent {}