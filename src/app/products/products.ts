import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-container">
      <h1>Products</h1>
      @if (loading) {
        <div class="loading">Loading products...</div>
      }
      @if (error) {
        <div class="error">{{ error }}</div>
      }
      @if (!loading && !error) {
        <div class="products-grid">
          @for (product of products; track product.id) {
            <div class="product-card">
              <img [src]="product.thumbnail" [alt]="product.title" class="product-image" />
              <div class="product-info">
                <h2>{{ product.title }}</h2>
                <p class="product-category">{{ product.category }}</p>
                <p class="product-description">{{ product.description }}</p>
                <p class="product-price">\${{ product.price }}</p>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data.products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
      }
    });
  }
}