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
      <p>Product listings will be loaded here from the API.</p>
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
      margin-bottom: 1rem;
      color: #333;
    }

    p {
      color: #666;
      margin-bottom: 0.5rem;
    }
  `]
})
export class ProductsComponent {
  // Future API integration: https://dummyjson.com/products
}