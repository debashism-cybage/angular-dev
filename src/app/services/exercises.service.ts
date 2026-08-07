import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

export interface ExercisesResponse {
  success: boolean;
  data: Exercise[];
}

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private readonly apiUrl = 'https://oss.exercisedb.dev/api/v1/exercises';

  constructor(private http: HttpClient) {}

  getExercises(): Observable<ExercisesResponse> {
    return this.http.get<ExercisesResponse>(this.apiUrl).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message || 'Failed to fetch exercises'));
      })
    );
  }
}