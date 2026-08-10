import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  availabilityStatus: string;
  thumbnail: string;
  images: string[];
  tags?: string[];
  sku?: string;
  weight?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(skip: number = 0, limit: number = 30): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    return this.http.get<ProductsResponse>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        return throwError(() => new Error(error?.message || 'Failed to fetch products'));
      })
    );
  }
}