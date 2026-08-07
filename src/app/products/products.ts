import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  template: `
    <div class="products-container">
      <h1>Products</h1>
      <p>Products dashboard coming soon.</p>
    </div>
  `,
  styles: [`
    .products-container {
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
export class ProductsComponent {}