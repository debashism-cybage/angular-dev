import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// API endpoint: https://dummyjson.com/products

@Component({
  selector: 'app-products-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-dashboard">
      <h1 class="page-title">Products</h1>
      <div class="placeholder-content">
        <p>Products dashboard coming soon.</p>
      </div>
    </div>
  `,
  styles: [`
    .products-dashboard {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .placeholder-content {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 2rem;
      color: #6b7280;
      font-size: 1rem;
    }
  `]
})
export class ProductsDashboardComponent {}