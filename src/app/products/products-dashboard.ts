import { Component } from '@angular/core';

@Component({
  selector: 'app-products-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="products-dashboard">
      <h2>Products Dashboard</h2>
      <p>Welcome to the Products section. Content coming soon.</p>
    </div>
  `,
  styles: [`
    .products-dashboard {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      font-family: sans-serif;
      color: #333;
    }

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #222;
    }

    p {
      font-size: 1rem;
      color: #555;
    }
  `]
})
export class ProductsDashboardComponent {}