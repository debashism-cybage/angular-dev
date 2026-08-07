import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recipes-container">
      <h1>Recipes</h1>
      <p>Recipes dashboard coming soon.</p>
    </div>
  `,
  styles: [`
    .recipes-container {
      padding: 2rem;
      max-width: 900px;
      margin: 0 auto;
      font-family: sans-serif;
      color: #333;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1rem;
      color: #666;
    }
  `]
})
export class RecipesComponent {}