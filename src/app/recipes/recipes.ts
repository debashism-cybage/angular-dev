import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing: number;
  rating: number;
  mealType: string[];
}

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  template: `
    <div class="recipes-container">
      <h1>Recipes</h1>
      <p>Browse and discover delicious recipes.</p>

      @if (loading()) {
        <div class="loading-container">
          <div class="spinner"></div>
          <p>Loading recipes...</p>
        </div>
      }

      @if (error()) {
        <div class="error-container">
          <p class="error-message">{{ error() }}</p>
          <button class="retry-btn" (click)="fetchRecipes()">Retry</button>
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
            class="page-btn"
            [disabled]="currentPage() === 1"
            (click)="goToPage(currentPage() - 1)"
          >
            Previous
          </button>

          @for (page of pageNumbers(); track page) {
            <button
              class="page-btn"
              [class.active]="page === currentPage()"
              (click)="goToPage(page)"
            >
              {{ page }}
            </button>
          }

          <button
            class="page-btn"
            [disabled]="currentPage() === totalPages()"
            (click)="goToPage(currentPage() + 1)"
          >
            Next
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .recipes-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      background-color: #ffffff;
      color: #1a1a1a;
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

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 5px solid #e0e0e0;
      border-top-color: #4a90e2;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error-container {
      background-color: #fff3f3;
      border: 1px solid #f5c2c2;
      border-radius: 8px;
      padding: 24px;
      text-align: center;
    }

    .error-message {
      color: #cc0000;
      margin-bottom: 12px;
    }

    .retry-btn {
      background-color: #4a90e2;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      padding: 8px 20px;
      cursor: pointer;
      font-size: 0.95rem;
    }

    .retry-btn:hover {
      background-color: #357abd;
    }

    .recipes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
    }

    .page-btn {
      background-color: #f0f0f0;
      color: #1a1a1a;
      border: 1px solid #d0d0d0;
      border-radius: 6px;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.2s;
    }

    .page-btn:hover:not([disabled]) {
      background-color: #dde8f7;
    }

    .page-btn.active {
      background-color: #4a90e2;
      color: #ffffff;
      border-color: #4a90e2;
    }

    .page-btn[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class RecipesComponent implements OnInit {
  recipes = signal<Recipe[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalRecipes = signal<number>(0);
  readonly itemsPerPage = 30;

  totalPages = signal<number>(1);
  pageNumbers = signal<number[]>([1]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes(): void {
    this.loading.set(true);
    this.error.set(null);
    const skip = (this.currentPage() - 1) * this.itemsPerPage;
    const url = `https://dummyjson.com/recipes?limit=${this.itemsPerPage}&skip=${skip}`;
    this.http.get<RecipesResponse>(url).subscribe({
      next: (data) => {
        this.recipes.set(data.recipes);
        this.totalRecipes.set(data.total);
        const pages = Math.ceil(data.total / this.itemsPerPage);
        this.totalPages.set(pages);
        this.pageNumbers.set(Array.from({ length: pages }, (_, i) => i + 1));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load recipes. Please try again.');
        this.loading.set(false);
      }
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage.set(page);
    this.fetchRecipes();
  }
}