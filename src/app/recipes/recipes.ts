import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../services/recipes.service';
import { Recipe, RecipesResponse } from '../models/recipe.model';
import { RecipeCardComponent } from './recipe-card/recipe-card';
import { ThemeToggleComponent } from '../shared/theme-toggle/theme-toggle';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, ThemeToggleComponent],
  template: `
    <div class="recipes-container" [class.dark]="themeService.isDarkMode()">
      <div class="recipes-header">
        <div>
          <h1>Recipes</h1>
          <p>Browse and discover delicious recipes.</p>
        </div>
        <app-theme-toggle></app-theme-toggle>
      </div>

      @if (loading()) {
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading recipes...</p>
        </div>
      }

      @if (error()) {
        <div class="error-message">
          <p>{{ error() }}</p>
        </div>
      }

      @if (!loading() && !error()) {
        <div class="recipes-grid">
          @for (recipe of recipes(); track recipe.id) {
            <app-recipe-card [recipe]="recipe"></app-recipe-card>
          }
        </div>

        <div class="pagination">
          <button
            class="pagination-btn"
            (click)="previousPage()"
            [disabled]="skip() === 0">
            Previous
          </button>
          <span class="page-info">
            Page {{ currentPage() }} of {{ totalPages() }} ({{ total() }} recipes)
          </span>
          <button
            class="pagination-btn"
            (click)="nextPage()"
            [disabled]="skip() + limit() >= total()">
            Next
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      --bg-primary: #ffffff;
      --bg-secondary: #f5f5f5;
      --text-primary: #1a1a1a;
      --text-secondary: #555555;
      --border-color: #e0e0e0;
      --spinner-border: #e0e0e0;
      --spinner-top: #4a90e2;
      --btn-bg: #4a90e2;
      --btn-hover: #357abd;
      --btn-disabled: #b0c4de;
      --error-bg: #fff3f3;
      --error-border: #f5c2c2;
      --error-text: #c0392b;
    }

    .recipes-container.dark {
      --bg-primary: #1a1a2e;
      --bg-secondary: #16213e;
      --text-primary: #e0e0e0;
      --text-secondary: #a0a0a0;
      --border-color: #444466;
      --spinner-border: #444466;
      --spinner-top: #6aabff;
      --btn-bg: #3a7bd5;
      --btn-hover: #2a5fa8;
      --btn-disabled: #3a4a5e;
      --error-bg: #3a1a1a;
      --error-border: #7a3232;
      --error-text: #e07070;
    }

    .recipes-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      background-color: var(--bg-primary);
      min-height: 100vh;
      transition: background-color 0.3s, color 0.3s;
    }

    .recipes-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    p {
      color: var(--text-secondary);
      font-size: 1rem;
      margin-bottom: 16px;
    }

    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid var(--spinner-border);
      border-top-color: var(--spinner-top);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error-message {
      background-color: var(--error-bg);
      border: 1px solid var(--error-border);
      border-radius: 8px;
      padding: 16px 24px;
      color: var(--error-text);
      text-align: center;
    }

    .recipes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 16px 0;
    }

    .pagination-btn {
      padding: 8px 20px;
      background-color: var(--btn-bg);
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .pagination-btn:hover:not(:disabled) {
      background-color: var(--btn-hover);
    }

    .pagination-btn:disabled {
      background-color: var(--btn-disabled);
      cursor: not-allowed;
    }

    .page-info {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }
  `]
})
export class RecipesComponent implements OnInit {
  recipes = signal<Recipe[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  skip = signal<number>(0);
  limit = signal<number>(30);
  total = signal<number>(0);

  currentPage = signal<number>(1);
  totalPages = signal<number>(1);

  constructor(private recipesService: RecipesService, public themeService: ThemeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.loading.set(true);
    this.error.set(null);
    this.recipesService.getRecipes(this.skip(), this.limit()).subscribe({
      next: (response: RecipesResponse) => {
        this.recipes.set(response.recipes);
        this.total.set(response.total);
        this.totalPages.set(Math.ceil(response.total / this.limit()));
        this.currentPage.set(Math.floor(this.skip() / this.limit()) + 1);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.error.set('Failed to load recipes. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  nextPage(): void {
    if (this.skip() + this.limit() < this.total()) {
      this.skip.set(this.skip() + this.limit());
      this.loadRecipes();
    }
  }

  previousPage(): void {
    if (this.skip() > 0) {
      this.skip.set(Math.max(0, this.skip() - this.limit()));
      this.loadRecipes();
    }
  }
}