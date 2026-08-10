import { Component } from '@angular/core';

@Component({
  selector: 'app-products-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="products-dashboard">
      <h1 class="page-title">Products</h1>
      <div class="placeholder-content">
        <p>Products dashboard content coming soon.</p>
      </div>
    </div>
  `,
  styles: [`
    .products-dashboard {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-title {
      font-size: 28px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 24px;
    }

    .placeholder-content {
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 32px;
      text-align: center;
      color: #666666;
      font-size: 16px;
    }
  `]
})
export class ProductsDashboardComponent {}