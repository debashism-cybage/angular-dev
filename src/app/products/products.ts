import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-container">
      <h1>Products</h1>
      <p>Welcome to the Products dashboard.</p>
      <p>Products data will be loaded from <a href="https://dummyjson.com/products" target="_blank">https://dummyjson.com/products</a>.</p>
      <div class="coming-soon">
        <p>Product listings coming soon...</p>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1a1a1a;
    }

    p {
      font-size: 1rem;
      color: #555;
      margin-bottom: 12px;
    }

    a {
      color: #4f46e5;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .coming-soon {
      margin-top: 24px;
      padding: 16px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }

    .coming-soon p {
      color: #6b7280;
      font-style: italic;
    }
  `]
})
export class ProductsComponent {}
