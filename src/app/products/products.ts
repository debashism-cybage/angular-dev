import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  imports: [CommonModule],
  template: `
    <div class="products-container">
      <h1>Products</h1>

      <div class="loading-indicator" *ngIf="loading">
        <div class="spinner"></div>
        <p>Loading products...</p>
      </div>

      <div class="error-message" *ngIf="error && !loading">
        <p>{{ error }}</p>
        <button (click)="fetchProducts()">Retry</button>
      </div>

      <div *ngIf="!loading && !error">
        <div class="products-grid">
          <div class="product-card" *ngFor="let product of products">
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

        <div class="pagination" *ngIf="total > 0">
          <button
            class="pagination-btn"
            [disabled]="skip === 0"
            (click)="prevPage()"
          >
            &laquo; Previous
          </button>
          <span class="pagination-info">
            Showing {{ skip + 1 }} - {{ getEndItem() }} of {{ total }}
          </span>
          <button
            class="pagination-btn"
            [disabled]="skip + limit >= total"
            (click)="nextPage()"
          >
            Next &raquo;
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      background-color: #ffffff;
      color: #1a1a1a;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 24px;
      color: #1a1a1a;
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
      border: 4px solid #e5e7eb;
      border-top-color: #4f46e5;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-indicator p {
      color: #6b7280;
      font-size: 1rem;
    }

    .error-message {
      margin-top: 24px;
      padding: 20px;
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      text-align: center;
    }

    .error-message p {
      color: #dc2626;
      font-size: 1rem;
      margin-bottom: 12px;
    }

    .error-message button {
      padding: 8px 20px;
      background-color: #dc2626;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .error-message button:hover {
      background-color: #b91c1c;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .product-card {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
      transition: box-shadow 0.2s ease;
      display: flex;
      flex-direction: column;
    }

    .product-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    .product-thumbnail {
      width: 100%;
      height: 180px;
      overflow: hidden;
      background-color: #f3f4f6;
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
      color: #111827;
      margin: 0;
      line-height: 1.3;
    }

    .product-category {
      font-size: 0.75rem;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .product-brand {
      font-size: 0.8rem;
      color: #374151;
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
      color: #111827;
    }

    .product-discount {
      font-size: 0.8rem;
      color: #16a34a;
      font-weight: 600;
      background-color: #dcfce7;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .product-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      color: #6b7280;
    }

    .product-rating {
      color: #f59e0b;
      font-weight: 600;
    }

    .product-stock {
      color: #6b7280;
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
      background-color: #dcfce7;
      color: #15803d;
    }

    .availability-low-stock {
      background-color: #fef9c3;
      color: #a16207;
    }

    .availability-out-of-stock {
      background-color: #fee2e2;
      color: #dc2626;
    }

    .availability-default {
      background-color: #f3f4f6;
      color: #374151;
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 16px 0;
      border-top: 1px solid #e5e7eb;
      margin-top: 8px;
    }

    .pagination-btn {
      padding: 8px 20px;
      background-color: #4f46e5;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .pagination-btn:hover:not([disabled]) {
      background-color: #4338ca;
    }

    .pagination-btn[disabled] {
      background-color: #c7d2fe;
      cursor: not-allowed;
    }

    .pagination-info {
      font-size: 0.9rem;
      color: #6b7280;
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
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;
  skip: number = 0;
  limit: number = 30;
  total: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.error = null;
    const url = `https://dummyjson.com/products?limit=${this.limit}&skip=${this.skip}`;
    this.http.get<ProductsResponse>(url).subscribe({
      next: (response) => {
        this.products = response.products;
        this.total = response.total;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
      }
    });
  }

  nextPage(): void {
    if (this.skip + this.limit < this.total) {
      this.skip += this.limit;
      this.fetchProducts();
    }
  }

  prevPage(): void {
    if (this.skip > 0) {
      this.skip = Math.max(0, this.skip - this.limit);
      this.fetchProducts();
    }
  }

  getEndItem(): number {
    return Math.min(this.skip + this.limit, this.total);
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