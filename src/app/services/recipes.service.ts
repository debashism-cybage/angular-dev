import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RecipesResponse } from '../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private apiUrl = 'https://dummyjson.com/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(skip: number, limit: number): Observable<RecipesResponse> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    return this.http.get<RecipesResponse>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}