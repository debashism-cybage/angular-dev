import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';
import { ThemeService } from '../theme/theme.service';

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  availabilityStatus: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
  template: `
    <div class="products-container" [class.dark]="themeService.isDark()">
      <div class="products-header">
        <h1>Products</h1>
        <app-theme-toggle></app-theme-toggle>
      </div>

      <div class="loading-indicator" *ngIf="loading()">
        <div class="spinner"></div>
        <p>Loading products...</p>
      </div>

      <div class="error-message" *ngIf="error() && !loading()">
        <p>{{ error() }}</p>
        <button (click)="fetchProducts()">Retry</button>
      </div>

      <div *ngIf="!loading() && !error()">
        <div class="products-grid">
          <div class="product-card" *ngFor="let product of products()">
            <div class="product-thumbnail">
              <img
                [src]="product.thumbnail"
                [alt]="product.title"
                (error)="onImageError($event)"
              />
            </div>
            <div class="product-info">
              <h3 class="product-title">{{ product.title }}</h3>
              <span class="product-category">{{ product.category }}</span>
              <div class="product-brand" *ngIf="product.brand">{{ product.brand }}</div>
              <div class="product-pricing">
                <span class="product-price">\${{ product.price.toFixed(2) }}</span>
                <span class="product-discount">-{{ product.discountPercentage.toFixed(1) }}%</span>
              </div>
              <div class="product-meta">
                <span class="product-rating">&#9733; {{ product.rating.toFixed(1) }}</span>
                <span class="product-stock">Stock: {{ product.stock }}</span>
              </div>
              <div class="product-availability" [ngClass]="getAvailabilityClass(product.availabilityStatus)">
                {{ product.availabilityStatus }}
              </div>
            </div>
          </div>
        </div>

        <div class="pagination" *ngIf="total() > 0">
          <button
            class="pagination-btn"
            [disabled]="skip() === 0"
            (click)="prevPage()"
          >
            &laquo; Previous
          </button>
          <span class="pagination-info">
            Showing {{ skip() + 1 }} - {{ getEndItem() }} of {{ total() }}
          </span>
          <button
            class="pagination-btn"
            [disabled]="skip() + limit >= total()"
            (click)="nextPage()"
          >
            Next &raquo;
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --bg-primary: #ffffff;
      --bg-secondary: #f3f4f6;
      --bg-card: #ffffff;
      --text-primary: #1a1a1a;
      --text-secondary: #6b7280;
      --text-heading: #111827;
      --border-color: #e5e7eb;
      --spinner-track: #e5e7eb;
      --spinner-color: #4f46e5;
      --error-bg: #fef2f2;
      --error-border: #fecaca;
      --error-text: #dc2626;
      --error-btn-bg: #dc2626;
      --error-btn-hover: #b91c1c;
      --card-shadow: rgba(0, 0, 0, 0.06);
      --card-shadow-hover: rgba(0, 0, 0, 0.12);
      --brand-color: #374151;
      --price-color: #111827;
      --discount-bg: #dcfce7;
      --discount-color: #16a34a;
      --rating-color: #f59e0b;
      --stock-color: #6b7280;
      --avail-in-stock-bg: #dcfce7;
      --avail-in-stock-color: #15803d;
      --avail-low-stock-bg: #fef9c3;
      --avail-low-stock-color: #a16207;
      --avail-out-of-stock-bg: #fee2e2;
      --avail-out-of-stock-color: #dc2626;
      --avail-default-bg: #f3f4f6;
      --avail-default-color: #374151;
      --pagination-border: #e5e7eb;
      --pagination-btn-bg: #4f46e5;
      --pagination-btn-hover: #4338ca;
      --pagination-btn-disabled: #c7d2fe;
      --pagination-info-color: #6b7280;
    }

    .products-container.dark {
      --bg-primary: #0f172a;
      --bg-secondary: #1e293b;
      --bg-card: #1e293b;
      --text-primary: #f1f5f9;
      --text-secondary: #94a3b8;
      --text-heading: #f8fafc;
      --border-color: #334155;
      --spinner-track: #334155;
      --spinner-color: #818cf8;
      --error-bg: #3b1f1f;
      --error-border: #7f1d1d;
      --error-text: #fca5a5;
      --error-btn-bg: #dc2626;
      --error-btn-hover: #b91c1c;
      --card-shadow: rgba(0, 0, 0, 0.3);
      --card-shadow-hover: rgba(0, 0, 0, 0.5);
      --brand-color: #cbd5e1;
      --price-color: #f1f5f9;
      --discount-bg: #14532d;
      --discount-color: #86efac;
      --rating-color: #fbbf24;
      --stock-color: #94a3b8;
      --avail-in-stock-bg: #14532d;
      --avail-in-stock-color: #86efac;
      --avail-low-stock-bg: #422006;
      --avail-low-stock-color: #fde68a;
      --avail-out-of-stock-bg: #450a0a;
      --avail-out-of-stock-color: #fca5a5;
      --avail-default-bg: #1e293b;
      --avail-default-color: #cbd5e1;
      --pagination-border: #334155;
      --pagination-btn-bg: #6366f1;
      --pagination-btn-hover: #4f46e5;
      --pagination-btn-disabled: #312e81;
      --pagination-info-color: #94a3b8;
    }

    .products-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }

    .products-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0;
      color: var(--text-heading);
    }

    .loading-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 0;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid var(--spinner-track);
      border-top-color: var(--spinner-color);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-indicator p {
      color: var(--text-secondary);
      font-size: 1rem;
    }

    .error-message {
      margin-top: 24px;
      padding: 20px;
      background-color: var(--error-bg);
      border: 1px solid var(--error-border);
      border-radius: 8px;
      text-align: center;
    }

    .error-message p {
      color: var(--error-text);
      font-size: 1rem;
      margin-bottom: 12px;
    }

    .error-message button {
      padding: 8px 20px;
      background-color: var(--error-btn-bg);
      color: #ffffff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .error-message button:hover {
      background-color: var(--error-btn-hover);
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .product-card {
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 1px 4px var(--card-shadow);
      transition: box-shadow 0.2s ease;
      display: flex;
      flex-direction: column;
    }

    .product-card:hover {
      box-shadow: 0 4px 12px var(--card-shadow-hover);
    }

    .product-thumbnail {
      width: 100%;
      height: 180px;
      overflow: hidden;
      background-color: var(--bg-secondary);
    }

    .product-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-info {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
    }

    .product-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-heading);
      margin: 0;
      line-height: 1.3;
    }

    .product-category {
      font-size: 0.75rem;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .product-brand {
      font-size: 0.8rem;
      color: var(--brand-color);
      font-style: italic;
    }

    .product-pricing {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }

    .product-price {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--price-color);
    }

    .product-discount {
      font-size: 0.8rem;
      color: var(--discount-color);
      font-weight: 600;
      background-color: var(--discount-bg);
      padding: 2px 6px;
      border-radius: 4px;
    }

    .product-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      color: var(--text-secondary);
    }

    .product-rating {
      color: var(--rating-color);
      font-weight: 600;
    }

    .product-stock {
      color: var(--stock-color);
    }

    .product-availability {
      font-size: 0.78rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 4px;
      align-self: flex-start;
      margin-top: 4px;
    }

    .availability-in-stock {
      background-color: var(--avail-in-stock-bg);
      color: var(--avail-in-stock-color);
    }

    .availability-low-stock {
      background-color: var(--avail-low-stock-bg);
      color: var(--avail-low-stock-color);
    }

    .availability-out-of-stock {
      background-color: var(--avail-out-of-stock-bg);
      color: var(--avail-out-of-stock-color);
    }

    .availability-default {
      background-color: var(--avail-default-bg);
      color: var(--avail-default-color);
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 16px 0;
      border-top: 1px solid var(--pagination-border);
      margin-top: 8px;
    }

    .pagination-btn {
      padding: 8px 20px;
      background-color: var(--pagination-btn-bg);
      color: #ffffff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .pagination-btn:hover:not([disabled]) {
      background-color: var(--pagination-btn-hover);
    }

    .pagination-btn[disabled] {
      background-color: var(--pagination-btn-disabled);
      cursor: not-allowed;
    }

    .pagination-info {
      font-size: 0.9rem;
      color: var(--pagination-info-color);
    }

    @media (max-width: 768px) {
      .products-container {
        padding: 16px;
      }

      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 14px;
      }

      .product-thumbnail {
        height: 140px;
      }
    }

    @media (max-width: 480px) {
      .products-grid {
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }

      .pagination {
        flex-direction: column;
        gap: 10px;
      }
    }
  `]
})
export class ProductsComponent implements OnInit {
  protected readonly products = signal<Product[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly skip = signal(0);
  protected readonly total = signal(0);
  protected readonly limit = 30;

  constructor(private http: HttpClient, protected themeService: ThemeService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading.set(true);
    this.error.set(null);
    const url = `https://dummyjson.com/products?limit=${this.limit}&skip=${this.skip()}`;
    this.http.get<ProductsResponse>(url).subscribe({
      next: (response) => {
        this.products.set(response.products);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products. Please try again.');
        this.loading.set(false);
      }
    });
  }

  nextPage(): void {
    if (this.skip() + this.limit < this.total()) {
      this.skip.set(this.skip() + this.limit);
      this.fetchProducts();
    }
  }

  prevPage(): void {
    if (this.skip() > 0) {
      this.skip.set(Math.max(0, this.skip() - this.limit));
      this.fetchProducts();
    }
  }

  getEndItem(): number {
    return Math.min(this.skip() + this.limit, this.total());
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/240x180?text=No+Image';
  }

  getAvailabilityClass(status: string): string {
    if (!status) return 'availability-default';
    const lower = status.toLowerCase();
    if (lower.includes('in stock')) return 'availability-in-stock';
    if (lower.includes('low stock')) return 'availability-low-stock';
    if (lower.includes('out of stock')) return 'availability-out-of-stock';
    return 'availability-default';
  }
}