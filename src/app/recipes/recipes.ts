import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recipes-container">
      <h1>Recipes</h1>
      <p>Your recipes will appear here.</p>
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
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 1rem;
    }

    p {
      color: #555;
      font-size: 1rem;
    }
  `]
})
export class RecipesComponent {}