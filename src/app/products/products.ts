import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  template: `
    <div class="products-container">
      <h1 class="products-title">Products</h1>
      <p class="products-placeholder">Products content will be displayed here.</p>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .products-title {
      font-size: 2rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 16px;
    }

    .products-placeholder {
      font-size: 1rem;
      color: #555555;
    }
  `]
})
export class ProductsComponent {}