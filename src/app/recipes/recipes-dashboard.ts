import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="recipes-dashboard">
      <h1>Recipes Dashboard</h1>
      <p>Welcome to the Recipes section. Content coming soon.</p>
    </div>
  `,
  styles: [`
    .recipes-dashboard {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
      color: #333;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #2c3e50;
    }

    p {
      font-size: 1rem;
      color: #666;
    }
  `]
})
export class RecipesDashboardComponent {}