import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// API endpoint: https://dummyjson.com/recipes

@Component({
  selector: 'app-recipes-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1 class="dashboard-title">Recipes</h1>
      <div class="dashboard-content">
        <p>Recipes dashboard coming soon.</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-title {
      font-size: 2rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .dashboard-content {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      color: #6b7280;
    }
  `]
})
export class RecipesDashboardComponent {}