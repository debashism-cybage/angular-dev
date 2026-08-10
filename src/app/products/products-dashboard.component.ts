import { Component } from '@angular/core';

@Component({
  selector: 'app-products-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="products-dashboard">
      <h1>Products</h1>
      <p>This is the products page. Browse and manage your products here.</p>
    </div>
  `,
  styles: [`
    .products-dashboard {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      color: #6b7280;
    }
  `]
})
export class ProductsDashboardComponent {}