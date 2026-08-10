import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExercisesResponse } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = 'https://oss.exercisedb.dev/api/v1/exercises';

  constructor(private http: HttpClient) {}

  getExercises(cursor?: string): Observable<ExercisesResponse> {
    let params = new HttpParams();
    if (cursor) {
      params = params.set('cursor', cursor);
    }
    return this.http.get<ExercisesResponse>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}