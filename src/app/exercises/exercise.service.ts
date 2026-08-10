import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExercisesResponse } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = '/api/exercises';

  constructor(private http: HttpClient) {}

  getExercises(cursor?: string): Observable<ExercisesResponse> {
    let params = new HttpParams();
    if (cursor) {
      params = params.set('cursor', cursor);
    }
    return this.http.get<ExercisesResponse>(this.apiUrl, { params });
  }
}